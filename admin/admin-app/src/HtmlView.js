import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';

const homeUrl = window.homeUrl;

class HtmlView extends Component {
	constructor(props) {
        super(props);

        this.lgcode = document.querySelector('#lgcode').value;
		this.google_intlcode = document.querySelector('#google_intlcode').value;
    }

    render() {
        // Google uses a different host for the US
        const thinkHost = `https://testmysite.${((this.google_intlcode === 'en-us') ? 'think' : '')}withgoogle.com/`;
        const thinkUrl = `${thinkHost}intl/${this.google_intlcode}?url=${encodeURIComponent(homeUrl)}`;

        const monitorUrl = new URL(window.adminUrl)
        monitorUrl.searchParams.append('page', 'pagespeed-monitor')

        return (
            <form method="post" action={document.querySelector('#admin_url_html_update').value} className="clearfix" encType="multipart/form-data">
	{/*<?php wp_nonce_field('abovethefold'); ?>*/}
	<div className="wrap abovethefold-wrapper">
		<div id="poststuff">
			<div id="post-body" className="metabox-holder">
				<div id="post-body-content">
					<div className="postbox">
						<h3 className="hndle">
							<span>{/*<?php _e('HTML Optimization', 'abovethefold'); ?>*/}</span>
						</h3>
						<div className="inside testcontent">

							<table className="form-table">
							<tbody>
	<tr valign="top">
		<th scope="row">Minify HTML</th>
		<td>
			<label><input type="checkbox" name="abovethefold[html_minify]" value="1" />{/*If html minify is enabled*/}Enabled</label>
			<p className="description">Compress HTML using an enhanced version of <a href="https://github.com/mrclay/minify/blob/master/lib/Minify/HTML.php" target="_blank">HTML.php</a>. This option will reduce the size of HTML but may require a full page cache to maintain an optimal server speed.</p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row">Strip HTML comments</th>
		<td>
			<label><input type="checkbox" name="abovethefold[html_comments]" value="1" />{/*If html comments is enabled*/} Enabled</label>
			<p className="description">Remove HTML comments from HTML, e.g. <code>&lt;!-- comment --&gt;</code>.</p>
		</td>
	</tr>
	<tr valign="top">
		<th scope="row">&nbsp;</th>
		<td style={{paddingTop:"0px"}}>
			<h5 className="h">&nbsp;Preserve List</h5>
			<textarea className="json-array-lines" name="abovethefold[html_comments_preserve]">
            {/*If html comments preserve is enabled*/}</textarea>
			<p className="description">Enter (parts of) HTML comments to exclude from removal. One string per line.</p>
		</td>
	</tr>
	<tr valign="top">
		<td colSpan="2" style={{padding:"0px"}}>
{/*Submit button*/}
		</td>
	</tr>
	</tbody>
</table>

<h3 style={{marginBottom:"0px",paddingLeft: "0px",paddingBottom: "0px"}}>Search &amp; Replace<a name="searchreplace">&nbsp;</a></h3>

<p className="description">This option enables to replace strings in the HTML. Enter an array of JSON objects.</p>
<div id="html_search_replace"><div className="loading-json-editor">{ __('Loading JSON editor...')}</div></div>
<input type="hidden" name="abovethefold[html_search_replace]" id="html_search_replace_src" value="<?php if (isset($options['html_search_replace']) && is_array($options['html_search_replace'])) {
    echo esc_attr(json_encode($options['html_search_replace']));
} ?>"  />

<div className="info_yellow"><strong>Example:</strong> <code id="html_search_replace_example" className="clickselect" data-example-text="show string" title="<?php print esc_attr('Click to select', 'pagespeed'); ?>" style={{cursor:"copy"}}>{'"search":"string to match","replace":"newstring"'}</code> (<a href="javascript:void(0);" data-example="html_search_replace_example" data-example-html={'coming soon'/*<?php print esc_attr(__('{\"search\":"|string to (match)|i","replace":"newstring $1","regex":true}', 'pagespeed')); ?>*/}>show regular expression</a>)</div>

<p>You can also add a search and replace configuration using the WordPress filter hook <code>abtf_html_replace</code>.</p>

<div id="wp_html_search_replace_example">
<pre style={{padding:"10px",border:"solid 1px #efefef"}}>{`function your_html_search_and_replace( &amp;$search, &amp;$replace, &amp;$search_regex, &amp;$replace_regex ) {

	# regular string replace
	$search[] = 'string';
	$replace[] = '';

	# regex replace
	$search_regex[] = '|regex (string)|i';
	$replace_regex[] = '$1';

	return $search; // required
}

add_filter( 'abtf_html_replace', 'your_html_search_and_replace', 10, 4 );`}</pre>
</div>
<hr />
{/*Submit button*/}


						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</form>

        );
    }
}

export default HtmlView;
