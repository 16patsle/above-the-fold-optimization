<?php

    // Google uses a different host for the US
    $thinkhost = 'https://testmysite.' . (($this->google_intlcode === 'en-us') ? 'think' : '') . 'withgoogle.com/';
    $thinkurl = $thinkhost . 'intl/'.$this->google_intlcode.'?url=' . urlencode(home_url());

?>
<div id="intro-root">
	<input id="lgcode" type="hidden" value="<?php echo $lgcode; ?>" />
	<input id="google_intlcode" type="hidden" value="<?php echo $this->google_intlcode; ?>" />
</div>