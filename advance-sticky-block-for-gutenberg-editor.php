<?php
/**
 * Plugin Name:       Advance Sticky Block For Gutenberg Editor
 * Description:       Create a sticky section for Gutenberg editor.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Mehedi Hasan
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advance-sticky-block-for-gutenberg-editor
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH') ) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function advance_sticky_block_for_gutenberg_editor()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'advance_sticky_block_for_gutenberg_editor');
