import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const lightenIntensity = 5;
const darkenIntensity = 5;
const backgroundHighlightColorSelectors = formatString([
        // ".flat-style .button-border",
        ".radio-selection",
        ".flat-style .portfolio-filter .pill-button.active",
        ".pill-button",
        " .theme-skin .pill-button.active"
]);

const backgroundLightenSchemeColorSelectors = formatString([
        ".flat-style .box-border",
        ".flat-style .image-border",
        ".flat-style .contact .form-item .form-group",
        ".flat-style .segmented-control",
        ".flat-style .checkbox label",
        ".flat-style .pallet-border",
        ".color-pallet",
        ".flat-style .pallet-button",
]);

const backgroundSchemeColorSelectors = formatString([
        ".flat-style .display-content>.container",
        ".flat-style .range-slider__range",
        ".flat-style .range-slider__value",
]);
const colorBaseColorSelectors = formatString([
        ".flat-style .portfolio-filter .pill-button ",
]);

function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}

export class FlatStyle extends Style {
        // Singleton Pattern
        private static _instance: FlatStyle;
        private constructor() { super() }
        public static get Instance(): FlatStyle {
                FlatStyle._instance ??= new FlatStyle();
                return FlatStyle._instance;
        }

        lightenSchemeColor: string = "#680317";
        darkenSchemeColor: string = "#680317";

        init() {
                $("body").addClass('flat-style');
        }

        removeEvents() {
                $(".pill-button, .segmented-control label, .pallet-button, table>tbody>tr").off('mouseenter mouseleave');
                $('.segmented-control input, .checkbox input').off('click');
        }

        revertStyle() { }

        setupEvents(): void {
                $(".segmented-control label").on('mouseenter', function () {
                        let id = $(this).attr("for");
                        if (!$("#" + id).prop("checked")) $(this).css('color', DynamicTheme.highlightColor.hex);
                });

                $(".segmented-control label").on('mouseleave', function () {
                        const radioId = $(this).attr('for');
                        if ($(`#${radioId}`).is(':checked')) return;
                        $(this).css('color', '');
                });

                $(" .pill-button").hover(
                        function () {
                                // TODO: variablize
                                $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
                        }, function () {
                                if ($(this).hasClass('active')) return;
                                $(this).css('background', DynamicTheme.highlightColor.hex);
                        }
                );

                $(" .theme-skin .pill-button").hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
                        }, function () {
                                if ($(this).hasClass('active')) return;
                                $(this).css('background', DynamicTheme.highlightColor.hex);
                        }
                );

                $(" .portfolio-filter .pill-button").hover(
                        function () {
                                $(this).attr('style', function (i, s) { return (s || '') + `background: ${DynamicTheme.highlightColor.hex} !important;` });
                        }, function () {
                                if ($(this).hasClass('active')) return;
                                // jQuery will alter the style INLINE, so by setting value to null we  get the original value
                                $(this).css('background', '');
                        }
                );

                $("table>tbody>tr").hover(
                        function () {
                                $(this).css('background', DynamicTheme.highlightColor.hex);
                        }, function () {
                                $(this).css('background', '');
                        }
                );

                $(".segmented-control input").click(function () {
                        $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.baseColor);
                        $(".segmented-control input[type='radio']:not(:checked)").each(
                                function () {
                                        $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
                                }
                        );
                });

                $(".checkbox input").click(function () {
                        if (!$(this).prop("checked")) {
                                $(this).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                        }
                        else {
                                $(this).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
                        }
                });
        }

        applyStyle(): void {
                this.updateColor();
                DynamicTheme.trackScrollbarRule.style.background = this.lightenSchemeColor;
                DynamicTheme.thumbScrollbarRule.style.background = this.darkenSchemeColor;
                DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
                DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
        }

        //TODO: Separate update functions for highlight, scheme, colorfull elements
        public updateColor() {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(lightenIntensity);
                this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(darkenIntensity);
                $(backgroundLightenSchemeColorSelectors).css('background-color', this.lightenSchemeColor);
                $(backgroundHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
                $(backgroundSchemeColorSelectors).css('background-color', DynamicTheme.schemeColor.hex);
                $(".flat-style :not(.portfolio-filter) .pill-button").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                $("#flat-skin-button .pill-button").css('background-color', DynamicTheme.highlightColor.getDarken(15));
                $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
                DynamicTheme.sliderThumbRule.style.backgroundColor = DynamicTheme.highlightColor.hex;
        }

        updateRadioUI(): void {
                $("input[type='radio']:checked").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
                        }
                );
                $("input[type='radio']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
                        }
                );
        }

        updateCheckboxUI(): void {
                $("input[type='checkbox']:checked").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', DynamicTheme.highlightColor.hex);
                                $("label[for='" + this.id + "']").next().css('color', DynamicTheme.highlightColor.hex);
                        }
                );
                $("input[type='checkbox']:not(:checked)").each(
                        function () {
                                $("label[for='" + this.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
                                $("label[for='" + this.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
                        }
                );
        }
        resetInactiveButtons(currentActiveButton: HTMLElement): void {
                $('#portfolio .pill-button').not(currentActiveButton).css('background', 'transparent');
        }
}