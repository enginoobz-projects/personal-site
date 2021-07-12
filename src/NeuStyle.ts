import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const backgroundSchemeColorSelectors = formatString([
        ".section",
        " .button-border",
        " .box-border",
        ".image-border",
        " .contact .form-item .form-group",
        ".segmented-control",
        ".checkbox label",
        ".color-pallet",
        ".portfolio-single .modal-content",
        ".range-slider__range",
        ".pallet-border",
        ".range-slider__value",
        ".theme-skin .pill-button",
        ".pill-button.active",
        ".pill-button",
        ".neu-style .display-content>.container",
        ".neu-style .pallet-button"
]);

const colorHighlightColorSelectors = formatString([
        ".pill-button",
]);

const dropBoxShadowSelectors = formatString([
        ".button-border",
        ".box-border",
        ".image-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro",
        ".badge-border",
        "table",
        "table thead ",
        ".pallet-border",
        ".range-slider__value",
        ".theme-skin .pill-button"
]);

const insetBoxShadowSelectors = formatString([
        ".pill-button.active",
        ".custom-scrollbar",
        ".blog .blog-image .after",
        " .pal-button.active",
        ".skill-boxes .box-border",
        ".color-pallet",
        ".timeline-items.box-border",
        ".range-slider__range",
        ".pallet-button.active",
        ".theme-skin .pill-button.active",
]);

const concaveBoxShadowSelectors = formatString([
        ".skill-box .skillbar",
        ".form-group",
        ".radio-selection",
]);

// EFFECTS
const hoverInsetBoxShadowSelectors = formatString([
        " .badge-border",
        "table>tbody>tr",
        ".pill-button",
        ".pallet-button"
]);

function formatString(selectorsArray: string[]): string {
        return selectorsArray.join(", ");
}

// REFACTOR: Implement singleton pattern for base class instead/generic singleton
export class NeuStyle extends Style {
        //  Singleton Pattern
        private static _instance: NeuStyle = new NeuStyle();
        private constructor() { super() }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        lightenSchemeColor: string = "#e6e6e6";
        darkenSchemeColor: string = "#c2c2c2";

        insetBoxShadow: string = '';
        dropBoxShadow: string = '';
        concaveBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';

        distance: number = 3;
        blur: number = 8;
        lightenIntensity: number = 7;
        darkenIntensity: number = 7;

        init() {
                $("body").addClass("neu-style");
                this.initRangeSliders();
                console.log('>>>>>>>>>>');
                console.log(backgroundSchemeColorSelectors);
        }

        setupLocalEvents(): void {
                // lazily setup
                if (this.localEventsAreSetup) return;
                this.localEventsAreSetup = true;

                $(hoverInsetBoxShadowSelectors).hover(
                        (event) => {
                                const target: HTMLElement = event.currentTarget;
                                this.updateLastHoverElement(target, 'box-shadow', target.style.boxShadow);
                                target.style.boxShadow = this.insetBoxShadow;
                        }, (event) => {
                                this.resetLastHoverElement(event.currentTarget);
                        }
                );

                // $(".segmented-control input").on('click', (event) => {
                //         $(".segmented-control label[for='" + event.currentTarget.id + "']").css('color', DynamicTheme.highlightColor.hex);
                //         $(".segmented-control input[type='radio']:not(:checked)").each(
                //                 (i, currentElement) => {
                //                         $(".segmented-control label[for='" + currentElement.id + "']").css('color', DynamicTheme.mutedBaseColor);
                //                 }
                //         );
                // });

                // $(".checkbox input").on('click', (event) => {
                //         if (!$(event.currentTarget).prop("checked")) {
                //                 $(event.currentTarget).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
                //                 $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.dropBoxShadow);
                //         }
                //         else {
                //                 $(event.currentTarget).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
                //                 $(".checkbox label[for='" + event.currentTarget.id + "']").css('box-shadow', this.concaveBoxShadow);
                //         }
                // });
        }

        removeLocalEvents() {
                $(`${hoverInsetBoxShadowSelectors}, .segmented-control label, .range-slider__range`).off('mouseenter mouseleave');
                $('.segmented-control input, .checkbox input').off('click');
        }

        revertStyle() {
                DynamicTheme.sliderThumbRule.style.boxShadow = 'none'; //TODO: css file
        }

        setupCustomizeEvents(): void {
                $("#distance, #blur, #light-intensity, #dark-intensity").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'distance':
                                        this.distance = parseInt(newValue);
                                        break;
                                case 'blur':
                                        this.blur = parseInt(newValue);
                                        break;
                                case 'light-intensity':
                                        this.lightenIntensity = parseInt(newValue);
                                        break;
                                case 'dark-intensity':
                                        this.darkenIntensity = parseInt(newValue);
                                        break;
                        }
                        this.updateBoxShadows();
                        this.setupLocalEvents();
                });
        }

        lastHoverClass: string = 'lastHover';
        originalProperty: string = '';
        originalPropertyValue: string = '';
        updateLastHoverElement(element: HTMLElement, originalProperty: string, originalPropertyValue: string) {
                element.classList.add(this.lastHoverClass);
                this.originalProperty = originalProperty;
                this.originalPropertyValue = originalPropertyValue;
        }

        resetLastHoverElement(element: HTMLElement) {
                element.classList.remove(this.lastHoverClass);
                if ($(element).hasClass('active')) return;
                $(element).css(this.originalProperty, this.originalPropertyValue);
        }

        onHighlightColorUpdated(): void {
                $(colorHighlightColorSelectors).css("color", DynamicTheme.highlightColor.hex);
                DynamicTheme.radioLabelHoverRule.style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                DynamicTheme.radioLabelCheckedRule.style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                DynamicTheme.checkboxLabelHoverRule.style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                DynamicTheme.checkboxNameCheckedRule.style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                DynamicTheme.checkboxIconCheckedRule.style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
        }

        onSchemeColorUpdated(): void {
                $(backgroundSchemeColorSelectors).css("background-color", DynamicTheme.schemeColor.hex);
                this.updateBoxShadows();
                this.setupLocalEvents();
        }

        private updateBoxShadows() {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
                this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
                this.dropBoxShadow = `${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.insetBoxShadow = `inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;
                this.concaveBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
                this.thumbScrollbarBoxShadow = `inset -${this.distance}px -${this.distance}px ${this.blur}px ${this.darkenSchemeColor}, inset ${this.distance}px ${this.distance}px ${this.blur}px ${this.lightenSchemeColor}`;

                $(dropBoxShadowSelectors).css("box-shadow", this.dropBoxShadow);
                $(insetBoxShadowSelectors).css("box-shadow", this.insetBoxShadow);
                $(concaveBoxShadowSelectors).css("box-shadow", this.concaveBoxShadow);
                DynamicTheme.trackScrollbarRule.style.setProperty('box-shadow', this.insetBoxShadow, 'important');
                DynamicTheme.trackScrollbarRule.style.setProperty('background-color', DynamicTheme.schemeColor.hex, 'important');
                DynamicTheme.thumbScrollbarRule.style.setProperty('box-shadow', this.thumbScrollbarBoxShadow, 'important');
                DynamicTheme.thumbScrollbarRule.style.setProperty('background-color', DynamicTheme.schemeColor.hex, 'important');
                DynamicTheme.sliderThumbRule.style.setProperty('box-shadow', this.dropBoxShadow, 'important');
                DynamicTheme.sliderThumbRule.style.setProperty('background-color', DynamicTheme.schemeColor.hex, 'important');
                DynamicTheme.sliderThumbHoverRule.style.setProperty('box-shadow', this.concaveBoxShadow, 'important');
                DynamicTheme.sliderTrackForcusRule.style.setProperty('box-shadow', this.concaveBoxShadow, 'important');
                // DynamicTheme.colorSwatchRule.style.boxShadow = this.dropBoxShadow;
        }

        resetInactiveButtons(currentActiveButton: HTMLElement): void {
                $('#portfolio .pill-button').not(currentActiveButton).css('box-shadow', '');
        }

        initRangeSliders() {
                $('#distance').attr('value', this.distance);
                $("#distance").next('.range-slider__value').html(this.distance.toString());
                $('#blur').attr('value', this.blur);
                $("#blur").next('.range-slider__value').html(this.blur.toString());
                $('#light-intensity').attr('value', this.lightenIntensity);
                $("#light-intensity").next('.range-slider__value').html(this.lightenIntensity.toString());
                $('#dark-intensity').attr('value', this.darkenIntensity);
                $("#dark-intensity").next('.range-slider__value').html(this.darkenIntensity.toString());
        }
}