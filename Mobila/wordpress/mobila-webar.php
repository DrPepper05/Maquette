<?php
/**
 * Plugin Name: Mobila WebAR Integration
 * Plugin URI: https://www.mobila.com
 * Description: Embed high-fidelity 3D models and native Augmented Reality (AR) on your WordPress and WooCommerce site seamlessly.
 * Version: 1.0.0
 * Author: Mobila Solutions Corp.
 * Author URI: https://www.mobila.com
 * License: GPL2
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Class Mobila_WebAR_Plugin
 * Handles shortcodes, WooCommerce hooks, admin settings, and script enqueuing.
 */
class Mobila_WebAR_Plugin {

    public function __construct() {
        // Frontend Actions
        add_action('wp_enqueue_scripts', array($this, 'enqueue_launcher_script'));
        add_shortcode('mobila_viewer', array($this, 'render_shortcode'));

        // WooCommerce Integration
        add_action('woocommerce_after_add_to_cart_button', array($this, 'inject_woo_ar_button'));
        
        // Admin Product Settings (Meta Box to assign Model ID to products)
        add_action('add_meta_boxes', array($this, 'add_product_meta_box'));
        add_action('save_post', array($this, 'save_product_meta_box_data'));

        // Admin General Settings
        add_action('admin_menu', array($this, 'create_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * Enqueue the Universal Mobila WebAR Launcher Script
     */
    public function enqueue_launcher_script() {
        $api_key = get_option('mobila_api_key', '');
        $api_url = get_option('mobila_api_url', 'https://api.mobila.com');
        $viewer_url = get_option('mobila_viewer_url', 'https://viewer.mobila.com');

        if (empty($api_key)) {
            return; // Don't load script if API key is not configured
        }

        // Register our launcher script
        wp_register_script(
            'mobila-webar-launcher',
            'https://widget.mobila.com/widget.js',
            array(),
            '1.0.0',
            true
        );

        // Add the necessary data-* attributes to the script tag for auto-configuration
        add_filter('script_loader_tag', function($tag, $handle) use ($api_key, $api_url, $viewer_url) {
            if ('mobila-webar-launcher' !== $handle) {
                return $tag;
            }
            return str_replace(
                ' src=',
                sprintf(
                    ' data-api-key="%1$s" data-api-url="%2$s" data-viewer-url="%3$s" src=',
                    esc_attr($api_key),
                    esc_url($api_url),
                    esc_url($viewer_url)
                ),
                $tag
            );
        }, 10, 2);

        wp_enqueue_script('mobila-webar-launcher');

        // Inject basic style for the WooCommerce button
        wp_register_style('mobila-webar-style', false);
        wp_enqueue_style('mobila-webar-style');
        wp_add_inline_style('mobila-webar-style', '
            .btn-mobila-webar {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background-color: rgba(37, 99, 235, 0.08) !important;
                color: #2563eb !important;
                border: 1.5px solid rgba(37, 99, 235, 0.2) !important;
                padding: 12px 24px !important;
                border-radius: 8px !important;
                font-weight: 600 !important;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                margin-left: 10px;
                vertical-align: middle;
            }
            .btn-mobila-webar:hover {
                background-color: #2563eb !important;
                color: #ffffff !important;
                border-color: #2563eb !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            }
        ');
    }

    /**
     * Shortcode: [mobila_viewer id="model_id" mode="inline|modal" label="View in AR"]
     */
    public function render_shortcode($atts) {
        $a = shortcode_atts(array(
            'id' => '',
            'mode' => 'inline',
            'label' => 'View in AR'
        ), $atts);

        if (empty($a['id'])) {
            return '<p style="color:red;">[Mobila WebAR] Error: Missing model ID attribute.</p>';
        }

        $model_id = esc_attr($a['id']);
        $mode = esc_attr($a['mode']);
        $label = esc_html($a['label']);

        if ($mode === 'modal') {
            return sprintf(
                '<button class="btn-mobila-webar mobila-webar-trigger" data-model-id="%1$s">%2$s</button>',
                $model_id,
                $label
            );
        } else {
            return sprintf(
                '<div class="mobila-webar-viewer" data-model-id="%1$s"></div>',
                $model_id
            );
        }
    }

    /**
     * WooCommerce Integration: Inject "View in AR" button after the Add to Cart button
     */
    public function inject_woo_ar_button() {
        global $product;
        if (!$product) return;

        // Fetch the associated Mobila Model ID from product meta
        $model_id = get_post_meta($product->get_id(), '_mobila_model_id', true);

        if (!empty($model_id)) {
            printf(
                '<button type="button" class="btn-mobila-webar mobila-webar-trigger" data-model-id="%1$s">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle; margin-right:4px;">
                        <path d="M4 6h4v2H4v4H2V8c0-1.1.9-2 2-2zm16 0c1.1 0 2 .9 2 2v4h-2V8h-4V6h4zM4 18h4v2H4c-1.1 0-2-.9-2-2v-4h2v4zm16 0h-4v-2h4v-4h2v4c0 1.1-.9 2-2 2zM12 8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
                    </svg>
                    View in your space
                </button>',
                esc_attr($model_id)
            );
        }
    }

    /**
     * WooCommerce Meta Box: Add Mobila WebAR settings to product edit page
     */
    public function add_product_meta_box() {
        add_meta_box(
            'mobila_webar_meta',
            'Mobila WebAR Integration',
            array($this, 'render_product_meta_box'),
            'product',
            'side',
            'default'
        );
    }

    public function render_product_meta_box($post) {
        // Retrieve existing value
        $value = get_post_meta($post->ID, '_mobila_model_id', true);
        wp_nonce_field('mobila_save_meta', 'mobila_meta_nonce');
        ?>
        <p>
            <label for="mobila_model_id"><strong>Mobila Model ID:</strong></label>
            <input type="text" id="mobila_model_id" name="mobila_model_id" value="<?php echo esc_attr($value); ?>" style="width:100%; margin-top:5px;" placeholder="e.g. chair-01" />
            <span class="description" style="font-size:11px; display:block; margin-top:5px;">
                Enter the unique Model ID generated in your Mobila SaaS Dashboard to activate the 3D/AR viewer.
            </span>
        </p>
        <?php
    }

    public function save_product_meta_box_data($post_id) {
        if (!isset($_POST['mobila_meta_nonce']) || !wp_verify_nonce($_POST['mobila_meta_nonce'], 'mobila_save_meta')) {
            return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['mobila_model_id'])) {
            $model_id = sanitize_text_field($_POST['mobila_model_id']);
            update_post_meta($post_id, '_mobila_model_id', $model_id);
        }
    }

    /**
     * Admin Settings Page
     */
    public function create_admin_menu() {
        add_options_page(
            'Mobila WebAR Settings',
            'Mobila WebAR',
            'manage_options',
            'mobila-webar',
            array($this, 'render_settings_page')
        );
    }

    public function register_settings() {
        register_setting('mobila-settings-group', 'mobila_api_key');
        register_setting('mobila-settings-group', 'mobila_api_url');
        register_setting('mobila-settings-group', 'mobila_viewer_url');
    }

    public function render_settings_page() {
        ?>
        <div class="wrap">
            <h1>Mobila WebAR Universal Configuration</h1>
            <p>Configure your B2B SaaS connections below to enable cross-platform 3D/AR loading.</p>
            
            <form method="post" action="options.php">
                <?php settings_fields('mobila-settings-group'); ?>
                <?php do_settings_sections('mobila-settings-group'); ?>
                
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Mobila API Key</th>
                        <td>
                            <input type="text" name="mobila_api_key" value="<?php echo esc_attr(get_option('mobila_api_key')); ?>" style="width: 400px;" placeholder="mobila_live_..." />
                            <p class="description">Your tenant authentication key from the Mobila SaaS dashboard.</p>
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Mobila API URL</th>
                        <td>
                            <input type="text" name="mobila_api_url" value="<?php echo esc_attr(get_option('mobila_api_url', 'https://api.mobila.com')); ?>" style="width: 400px;" />
                        </td>
                    </tr>
                    <tr valign="top">
                        <th scope="row">Mobila Viewer URL</th>
                        <td>
                            <input type="text" name="mobila_viewer_url" value="<?php echo esc_attr(get_option('mobila_viewer_url', 'https://viewer.mobila.com')); ?>" style="width: 400px;" />
                            <p class="description">The URL hosting your custom 3D model-viewer frame.</p>
                        </td>
                    </tr>
                </table>
                
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize the plugin
new Mobila_WebAR_Plugin();
