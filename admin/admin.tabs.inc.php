
<div class="wrap">
<h1><?php _e('Page Speed Optimization', 'abovethefold') ?></h1>
<nav class="nav-tab-wrapper" style="position:relative;">
<div class="ref">
        <a href="<?php print esc_url('https://github.com/16patsle/'); ?>" target="_blank" class="logo">PageSpeed.<span class="g100">PRO</span></a>

        <div class="links">
            <a href="https://github.com/optimalisatie/above-the-fold-optimization" target="_blank">Github</a> &dash; <a href="https://github.com/optimalisatie/above-the-fold-optimization/issues" target="_blank">Report a bug</a> &dash; <a href="https://wordpress.org/support/plugin/above-the-fold-optimization/reviews/#new-post" target="_blank">Review plugin</a>
        </div>
    </div>
<?php
        foreach ($this->tabs as $tabkey => $name) {
            if (in_array($tabkey, array('criticalcss-test','build-tool'))) {
                continue;
            }

            $class = ($tabkey == $tab || ($tabkey === 'criticalcss' && $tab == 'criticalcss-test')) ? ' nav-tab-active' : '';
            if ($tabkey === 'offer') {
                $class .= ($tabkey == 'offer') ? ' nav-tab-offer' : '';
                echo "<a class='nav-tab$class' href='".esc_url(add_query_arg(array('s' => 'o10n', 'tab' => 'search', 'type' => 'author'), admin_url('plugin-install.php')))."'>$name</a>";
            } else {
                $url = add_query_arg(array('page' => 'pagespeed' . (($tabkey !== 'intro') ? '-' . $tabkey : '')), admin_url('admin.php'));
                echo '<a class="nav-tab'.$class.'" href="'.esc_url($url).'">'.$name.'</a>';
            }
        }
        ?>
</nav>


</div>