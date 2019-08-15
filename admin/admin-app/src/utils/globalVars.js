import getValueOf from './getValueOf';

export const reactDir = getValueOf('#reactDir');
export const homeUrl = getValueOf('#homeUrl') || 'http://localhost';
export const adminUrl =
  getValueOf('#adminUrl') || 'http://localhost/wp-admin/admin.php';
export const abtfAdminNonce = document.querySelector('#abtf_admin_nonce')
  ? document.querySelector('#abtf_admin_nonce').innerHTML
  : '';
export const siteTitle =
  '‹' + document.title.split('‹')[1] || '‹ WordPress Site — WordPress';
export const ajaxUrl = window.ajaxurl || '/wp-admin/admin-ajax.php';
export const lgCode = getValueOf('#lgcode');
export const utmString = getValueOf('#utmstring');
export const googleIntlCode = getValueOf('#google_intlcode');
export const wpAbtfUri = getValueOf('#wpabtf_uri');
