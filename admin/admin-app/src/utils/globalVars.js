import getValueOf from './getValueOf';

const adminValues = JSON.parse(getValueOf('#admin_values', 'object'));

export const reactDir = getValueOf('#reactDir');
export const homeUrl = adminValues.homeUrl || 'http://localhost';
export const adminUrl = adminValues.adminUrl || 'http://localhost/wp-admin/';
export const adminTabs = adminValues.adminTabs || {};
export const abtfrAdminNonce = adminValues.abtfrAdminNonce || '';
export const abtfrRestNonce = adminValues.abtfrRestNonce || '';
export const siteTitle =
  '‹' + document.title.split('‹')[1] || '‹ WordPress Site — WordPress';
export const ajaxUrl = window.ajaxurl || '/wp-admin/admin-ajax.php';
export const lgCode = adminValues.lgCode;
export const utmString = adminValues.utmString;
export const googleIntlCode = adminValues.googleIntlCode;
export const wpAbtfrUri = adminValues.wpAbtfrUri;
export const criticalCssEditorUrl = adminValues.criticalCssEditorUrl;
export const extractCssKey = adminValues.extractCssKey;
