<div id="post-body-content" style="padding-bottom:0px;margin-bottom:0px;margin-left:5px;">
	<div class="authorbox">
		<div class="inside" style="width:auto;margin:0px;float:left;position:relative;margin-right:2em;">
			<p style="z-index:999;">Developed by <strong><a href="https://github.com/16patsle/" target="_blank">Patrick Sletvold, based on the original plugin by o10n-x</a></strong>
			<br />Contribute via <a href="https://github.com/16patsle/abtf-reborn/" target="_blank">Github</a> &dash; <a href="https://github.com/16patsle/abtf-reborn/issues" target="_blank">Report a bug</a> <!--&dash; <a href="https://wordpress.org/support/plugin/abtfr/reviews/?rate=5#new-post" target="_blank">Review this plugin</a>-->
			</p>

		</div>
	</div>
</div>
<?php if (
    isset($this->CTRL->options['update_count']) &&
    intval($this->CTRL->options['update_count']) > 0
) {
    // get current critical css config
    $criticalcss_files = $this->CTRL->criticalcss->get_theme_criticalcss();

    /**
     * Test if critical CSS has been configured
     */
    $criticalcss_configured = false;
    $css = isset($criticalcss_files['global.css'])
        ? $this->CTRL->criticalcss->get_file_contents(
            $criticalcss_files['global.css']['file']
        )
        : '';
    if ($css === '') {
        // empty, try conditional critical CSS
        foreach ($criticalcss_files as $file => $config) {
            if ($file === 'global.css') {
                continue;
            }
            $css = file_exists($criticalcss_files[$file]['file'])
                ? $this->CTRL->criticalcss->get_file_contents(
                    $criticalcss_files[$file]['file']
                )
                : '';
            if ($css !== '') {
                $criticalcss_configured = true;
                break;
            }
        }
    } else {
        $criticalcss_configured = true;
    }
    if (!$criticalcss_configured) {
        print '<div class="error" data-count="' .
            intval($this->CTRL->options['update_count']) .
            '">
		<p style="font-size:16px;">
			' .
            sprintf(
                __(
                    '<strong>Warning:</strong> <a href="%1$s">Critical Path CSS</a> is empty. This may cause a <a href="%2$s" target="_blank">Flash of Unstyled Content</a> when CSS optimization is enabled and it may trigger the two Google PageSpeed rules <a href="%3$s" target="_blank">%4$s</a> and <a href="%5$s" target="_blank">%6$s</a> that cause a significant penalty in the Google PageSpeed score.',
                    'abtfr'
                ),
                add_query_arg(
                    array('page' => 'abtfr-criticalcss'),
                    admin_url('admin.php')
                ),
                'https://en.wikipedia.org/wiki/Flash_of_unstyled_content',
                'https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery?hl=' .
                    $lgcode,
                '<em>' .
                    __(
                        'Eliminate render-blocking JavaScript and CSS in above-the-fold content',
                        'abtfr'
                    ) .
                    '</em>',
                'https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent?hl=' .
                    $lgcode,
                '<em>' . __('Prioritize visible content', 'abtfr') . '</em>'
            ) .
            '
			</p>
		<p>
			<a class="button" href="https://developers.google.com/speed/pagespeed/insights/?url=' .
            urlencode(home_url()) .
            '&amp;hl=' .
            $lgcode .
            '" target="_blank">Test Google PageSpeed Score</a>
		</p>
	</div>';
    }
}
