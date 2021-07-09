// color related selectors (property + corresponding style)
export var backgroundBaseColorSelectors = formatString([
    "#pp-nav li :not(.active) span",
]);
export var backgroundHighlightColorSelectors = formatString([
    ".bg-base-color",
    ".border-style",
    "#pp-nav li .active span",
    ".pp-slidesNav .active span"
]);
export var backgroundSchemeColorSelectors = formatString([
    ".section",
    ".box-border",
    ".segmented-control",
    ".image-border",
    ".form-group",
    ".skill-box .skillbar",
    ".blog .blog-image",
    ".blog .blog-item .before",
    ".flat-demo .section",
]);
export var colorHighlightColorSelectors = formatString([
    ".highlight-color",
    ".pill-button",
    ".overlay-menu a.active",
    ".timeline-year",
    ".portfolio .portfolio-filter li a",
    ".portfolio .portfolio-icon a i",
    ".contact .form-item .form-control",
    // ".theme-skin .neo-skin",
]);
export var colorBaseColorSelectors = formatString([
    "body",
    ".logo",
    ".color-switcher .pallet-border i",
    ".follow-label",
    ".social a i",
    ".blog-content h6 a",
    ".form-group input",
    ".form-group textarea",
    ".overlay-menu-toggler",
    ".modal-title",
    ".portfolio-single .close",
]);
export var colorMutedBaseColorSelectors = formatString([
    ".blog-content .list-inline-item span",
    ".contact-info-text small",
    ".hero-content p",
    ".title-wrapper span",
    ".form-control",
    ".range-slider label",
    ".range-slider__value",
    "#colour-panel label ",
]);
export var colorColorfull1Selectors = formatString([]);
export var borderRadiusSelectors = formatString([
    ".blog .blog-image",
    ".blog .blog-image .after",
    ".blog .blog-intro ",
    ".blog .blog-intro img",
    ".post-sidebar",
    ".post-sidebar-toggle ",
    ".aside-contents",
    ".search .form-group",
    ".breadcrumb",
    ".blog-single img",
    ".comments img",
    ".comments .commnet-image-border img",
    ".comments-devider",
    ".contact .form-item .form-group",
    ".contact #message.toast",
    ".pill-button",
    ".button-border",
    ".image-border img",
    ".image-border",
    ".color-switcher .color-pallet",
    ".color-switcher .pallet-border",
    " .pallet-button",
    ".box-border",
    ".badge",
    ".badge-border",
    ".course-item img",
    ".book-item>img",
    ".skill-box .skillbar",
    ".skill-box .fill-skillbar",
    ".segmented-control",
    ".radio-selection",
    ".checkbox label",
    ".range-slider__range",
    ".modal-content",
    "table"
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
