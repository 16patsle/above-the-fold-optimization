
<div class="wrap" id="root">
    <input id="home_url" type="hidden" value="<?php echo get_home_url(); ?>" />
    <input id="admin_url" type="hidden" value="<?php echo admin_url('admin.php'); ?>" />
    <input id="admin_tabs" type="hidden" value="<?php echo htmlspecialchars(json_encode($this->tabs)); ?>" />
    <input id="current_admin_tab" type="hidden" value="<?php echo htmlspecialchars(json_encode($tab)); ?>" />
</div>