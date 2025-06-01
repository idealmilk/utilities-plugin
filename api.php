<?php
/**
 * Plugin Name: Utilities Plugin Backend
 * Description: Provides a REST API endpoint to fetch utilities data with rates.
 */

add_action('rest_api_init', function () {
    register_rest_route('utilities-plugin/v1', '/utilities', [
        'methods'  => 'GET',
        'callback' => 'ntherm_get_utilities_with_rates',
        'permission_callback' => '__return_true',
    ]);
});

function ntherm_get_utilities_with_rates(WP_REST_Request $request) {
    $zip = $request->get_param('q');
    if (!$zip) {
        return new WP_REST_Response(['error' => 'Missing zip parameter'], 400);
    }

    $api_key = get_option('ntherm_api_key', '');

    $utilities_url = "https://sales.ntherm.com/sapi/zip?q=" . urlencode($zip);
    $utilities_response = wp_remote_get($utilities_url, [
        'headers' => [
            'Content-Type' => 'application/json',
            'api-key' => $api_key,
        ],
    ]);

    if (is_wp_error($utilities_response)) {
        return new WP_REST_Response(['error' => 'Error fetching utilities'], 500);
    }

    $utilities = json_decode(wp_remote_retrieve_body($utilities_response), true);
    if (!is_array($utilities)) {
        return new WP_REST_Response(['error' => 'Invalid utilities response'], 500);
    }

    $utilities_with_rates = [];

    foreach ($utilities as $util) {
        $rates_url = "https://sales.ntherm.com/sapi/rate?q=" . urlencode($util['util_id']);
        $rates_response = wp_remote_get($rates_url, [
            'headers' => [
                'Content-Type' => 'application/json',
                'api-key' => $api_key,
            ],
        ]);

        $rates = [];
        if (!is_wp_error($rates_response) && wp_remote_retrieve_response_code($rates_response) === 200) {
            $rates_data = json_decode(wp_remote_retrieve_body($rates_response), true);
            if (is_array($rates_data)) {
                foreach ($rates_data as $rate) {
                    $rates[] = [
                        'offer' => $rate['rate_offer'] ?? null,
                        'price' => $rate['rate_price'] ?? null,
                        'term'  => $rate['rate_term'] ?? null,
                        'type'  => $rate['rate_type'] ?? null,
                        'units' => $rate['rate_units'] ?? null,
                    ];
                }
            }
        }

        $utilities_with_rates[] = [
            'id'     => $util['util_id'] ?? null,
            'name'   => $util['util_name'] ?? null,
            'state'  => $util['util_state'] ?? null,
            'digits' => $util['util_digits'] ?? null,
            'type'   => $util['util_type'] ?? null,
            'rates'  => $rates,
        ];
    }

    return new WP_REST_Response($utilities_with_rates, 200);
}

add_action('admin_init', function () {
    register_setting('ntherm_settings_group', 'ntherm_api_key');
});

// Add a "Utilities Plugin Settings" submenu under "Settings"
add_action('admin_menu', function () {
    add_options_page(
        'Utilities Plugin Settings',
        'Utilities Plugin Settings',
        'manage_options',
        'ntherm-settings',
        'ntherm_settings_page'
    );
});

// Render the settings page
function ntherm_settings_page() {
    ?>
    <div class="wrap">
        <h1>Utilities Plugin Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('ntherm_settings_group');
            do_settings_sections('ntherm_settings_group');
            $api_key = get_option('ntherm_api_key', '');
            ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">API Key</th>
                    <td>
                        <input type="text" name="ntherm_api_key" value="<?php echo esc_attr($api_key); ?>" style="width: 400px;" />
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}