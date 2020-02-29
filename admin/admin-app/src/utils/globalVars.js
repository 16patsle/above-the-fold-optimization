import getValueOf from './getValueOf';

const adminValues = JSON.parse(getValueOf('#admin_values', 'object'));

export const reactDir = getValueOf('#reactDir');
export const homeUrl = adminValues.homeUrl || 'http://localhost';
export const adminUrl = adminValues.adminUrl || 'http://localhost/wp-admin/';
export const adminTabs = adminValues.adminTabs || {};
export const abtfAdminNonce = adminValues.abtfAdminNonce || '';
export const abtfRestNonce = adminValues.abtfRestNonce || '';
export const siteTitle =
  '‹' + document.title.split('‹')[1] || '‹ WordPress Site — WordPress';
export const ajaxUrl = window.ajaxurl || '/wp-admin/admin-ajax.php';
export const lgCode = adminValues.lgCode;
export const utmString = adminValues.utmString;
export const googleIntlCode = adminValues.googleIntlCode;
export const wpAbtfUri = adminValues.wpAbtfUri;

export const monitorSettings = adminValues.monitorSettings || {};
