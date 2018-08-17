<div id="intro-root">
	<input id="lgcode" type="hidden" value="<?php echo $lgcode; ?>" />
	<input id="google_intlcode" type="hidden" value="<?php echo $this->google_intlcode; ?>" />
	<input id="admin_url_html_update" type="hidden" value="<?php echo admin_url('admin-post.php?action=abtf_html_update'); ?>" />
	<div id="admin_nonce_html" type="hidden"><?php echo wp_nonce_field('abovethefold'); ?></div>
	<?php
		$html_minify = isset($options['html_minify']) && intval($options['html_minify']) === 1;
		$html_comments = isset($options['html_comments']) && intval($options['html_comments']) === 1;
		$html_comments_preserve = '';
		if(isset($options['html_comments_preserve'])) {
			$html_comments_preserve = $options['html_comments_preserve'];
		}
		$html_settings = '{"minify":' . json_encode($html_minify) . ',"comments":' . json_encode($html_comments) . ',"comments_preserve":' . json_encode($html_comments_preserve) . '}'
	?>
	<input type="hidden" name="abovethefold[html_search_replace]" id="html_settings" value='<?php echo $html_settings ?>'/>

	<input type="hidden" name="abovethefold[html_search_replace]" id="html_search_replace_src_server" value="<?php if (isset($options['html_search_replace']) && is_array($options['html_search_replace'])) {
		echo esc_attr(json_encode($options['html_search_replace']));
	} ?>"  />
</div>