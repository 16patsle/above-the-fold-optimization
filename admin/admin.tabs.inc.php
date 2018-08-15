
<div class="wrap">
<input id="home_url" type="hidden" value="<?php echo get_home_url(); ?>" />
<input id="admin_url" type="hidden" value="<?php echo admin_url('admin.php'); ?>" />
<input id="admin_tabs" type="hidden" value="<?php echo htmlspecialchars(json_encode($this->tabs)); ?>" />
<input id="current_admin_tab" type="hidden" value="<?php echo htmlspecialchars(json_encode($tab)); ?>" />
<h1><?php _e('Page Speed Optimization', 'abovethefold') ?></h1>
<div id="root"></div>
<nav class="nav-tab-wrapper" style="position:relative;">
<div class="ref">
        <div class="links">
            <a href="https://github.com/16patsle/above-the-fold-optimization" target="_blank">Github</a> &dash; <a href="https://github.com/16patsle/above-the-fold-optimization/issues" target="_blank">Report a bug</a> <!--&dash; <a href="https://wordpress.org/support/plugin/above-the-fold-optimization/reviews/#new-post" target="_blank">Review plugin</a>-->
        </div>
    </div>
<?php
        foreach ($this->tabs as $tabkey => $name) {
            if (in_array($tabkey, array('criticalcss-test','build-tool'))) {
                continue;
            }

            $class = ($tabkey == $tab || ($tabkey === 'criticalcss' && $tab == 'criticalcss-test')) ? ' nav-tab-active' : '';
            $url = add_query_arg(array('page' => 'pagespeed' . (($tabkey !== 'intro') ? '-' . $tabkey : '')), admin_url('admin.php'));
                echo '<a class="nav-tab'.$class.'" href="'.esc_url($url).'">'.$name.'</a>';
        }
        ?>
</nav>


</div>