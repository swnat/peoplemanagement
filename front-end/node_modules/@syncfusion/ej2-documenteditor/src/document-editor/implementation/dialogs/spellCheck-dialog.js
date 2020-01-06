import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { ListView } from '@syncfusion/ej2-lists';
import { TextElementBox, ErrorTextElementBox } from '../viewer/page';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
/**
 * Spell check dialog
 */
var SpellCheckDialog = /** @class */ (function () {
    function SpellCheckDialog(viewer) {
        var _this = this;
        /* tslint:disable:no-any */
        this.selectHandler = function (args) {
            _this.selectedText = args.text;
        };
        /**
         * @private
         */
        this.onCancelButtonClick = function () {
            _this.owner.clearSelectionHighlight();
            _this.owner.dialog.hide();
        };
        /**
         * @private
         */
        this.onIgnoreClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.owner.dialog.element);
                _this.parent.spellChecker.manageReplace('Ignore Once', _this.elementBox);
                _this.removeErrors();
                _this.parent.spellChecker.checkForNextError();
            }
        };
        /**
         * @private
         */
        this.onIgnoreAllClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.owner.dialog.element);
                var text = _this.elementBox.text;
                _this.parent.spellChecker.handleIgnoreAllItems({ element: _this.elementBox, text: text });
                _this.parent.spellChecker.checkForNextError();
            }
        };
        /**
         * @private
         */
        this.addToDictClicked = function () {
            if (!isNullOrUndefined(_this.elementBox)) {
                showSpinner(_this.owner.dialog.element);
                // tslint:disable-next-line:max-line-length
                _this.parent.spellChecker.handleAddToDictionary({ element: _this.elementBox, text: _this.elementBox.text });
                if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellChecker.checkForNextError();
            }
        };
        /**
         * @private
         */
        this.changeButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                showSpinner(_this.owner.dialog.element);
                _this.parent.spellChecker.manageReplace(_this.selectedText, _this.elementBox);
                _this.removeErrors();
                _this.parent.spellChecker.checkForNextError();
                _this.owner.dialog.content = '';
            }
        };
        /**
         * @private
         */
        this.changeAllButtonClicked = function () {
            if (!isNullOrUndefined(_this.selectedText)) {
                _this.isSpellChecking = true;
                showSpinner(_this.owner.dialog.element);
                var elements = _this.parent.spellChecker.errorWordCollection.get(_this.errorText);
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] instanceof ErrorTextElementBox && !elements[i].ischangeDetected) {
                        _this.parent.spellChecker.manageReplace(_this.selectedText, elements[i]);
                    }
                    else if (elements[i] instanceof TextElementBox) {
                        var matchResults = _this.parent.spellChecker.getMatchedResultsFromElement(elements[i]);
                        var results = matchResults.textResults;
                        // tslint:disable-next-line:max-line-length
                        var markIndex = (elements[i].ischangeDetected) ? elements[i].start.offset : elements[i].line.getOffset(elements[i], 0);
                        // tslint:disable-next-line:max-line-length
                        _this.parent.searchModule.textSearch.updateMatchedTextLocation(matchResults.matches, results, matchResults.elementInfo, 0, elements[i], false, null, markIndex);
                        for (var j = 0; j < results.length; j++) {
                            var element = _this.parent.spellChecker.createErrorElementWithInfo(results.innerList[j], elements[i]);
                            _this.parent.spellChecker.manageReplace(_this.selectedText, element);
                        }
                    }
                }
                if (_this.parent.spellChecker.errorWordCollection.containsKey(_this.errorText)) {
                    _this.parent.spellChecker.errorWordCollection.remove(_this.errorText);
                }
                _this.parent.spellChecker.checkForNextError();
                _this.owner.dialog.content = '';
            }
        };
        this.owner = viewer;
        createSpinner({ target: this.owner.dialog.element, cssClass: 'e-spin-overlay' });
    }
    Object.defineProperty(SpellCheckDialog.prototype, "parent", {
        /**
         * Gets the spell checker
         * @private
         */
        get: function () {
            return this.owner.owner;
        },
        enumerable: true,
        configurable: true
    });
    SpellCheckDialog.prototype.getModuleName = function () {
        return 'SpellCheckDialog';
    };
    /**
     * Method to remove errors
     */
    SpellCheckDialog.prototype.removeErrors = function () {
        if (!isNullOrUndefined(this.errorText) && this.parent.spellChecker.errorWordCollection.containsKey(this.errorText)) {
            var textElement = this.parent.spellChecker.errorWordCollection.get(this.errorText);
            textElement.splice(0, 1);
            if (textElement.length === 0) {
                this.parent.spellChecker.errorWordCollection.remove(this.errorText);
            }
        }
        if (this.parent.spellChecker.errorWordCollection.length === 0) {
            this.owner.dialog.hide();
        }
    };
    /**
     * @private
     */
    SpellCheckDialog.prototype.show = function (error, elementbox, callSpellChecker) {
        this.target = undefined;
        this.localValue = new L10n('documenteditor', this.owner.owner.defaultLocale);
        this.localValue.setLocale(this.owner.owner.locale);
        if (!this.target) {
            this.updateSuggestionDialog(error, elementbox, callSpellChecker);
        }
    };
    /**
     * @private
     */
    SpellCheckDialog.prototype.updateSuggestionDialog = function (error, elementBox, callSpellChecker) {
        var _this = this;
        this.elementBox = elementBox;
        var suggestions;
        if (this.isSpellChecking) {
            // tslint:disable-next-line:max-line-length
            /* tslint:disable:no-any */
            this.parent.spellChecker.CallSpellChecker(this.parent.spellChecker.languageID, error, false, true).then(function (data) {
                /* tslint:disable:no-any */
                var jsonObject = JSON.parse(data);
                suggestions = jsonObject.Suggestions;
                _this.isSpellChecking = false;
                _this.handleRetrievedSuggestion(error, suggestions);
            });
        }
        else {
            error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
            // tslint:disable-next-line:max-line-length
            suggestions = this.parent.spellChecker.errorSuggestions.containsKey(error) ? this.parent.spellChecker.errorSuggestions.get(error) : [];
            this.handleRetrievedSuggestion(error, suggestions);
        }
    };
    /**
     * Method to handle retrieved suggestions from server side
     * @param {string} error
     * @param {any} jsonObject
     */
    /* tslint:disable:no-any */
    SpellCheckDialog.prototype.handleRetrievedSuggestion = function (error, suggestions) {
        error = this.parent.spellChecker.manageSpecialCharacters(error, undefined, true);
        this.initSpellCheckDialog(this.localValue, error, suggestions);
        if (this.owner.selection.caret.style.display !== 'none') {
            this.owner.selection.caret.style.display = 'none';
        }
        this.owner.dialog.header = 'Spelling Editor';
        this.owner.dialog.height = 'auto';
        this.owner.dialog.width = 'auto';
        this.owner.dialog.content = this.target;
        this.owner.dialog.beforeOpen = this.owner.updateFocus;
        this.owner.dialog.buttons = [{
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localValue.getConstant('Cancel'), cssClass: 'e-control e-flat', isPrimary: true }
            }];
        this.owner.dialog.dataBind();
        this.owner.dialog.show();
        hideSpinner(this.owner.dialog.element);
    };
    /**
     * @private
     */
    SpellCheckDialog.prototype.initSpellCheckDialog = function (localValue, error, suggestion) {
        var instance = this;
        var id = this.owner.owner.containerId + '_add_SpellCheck';
        this.target = createElement('div', { id: id, className: 'e-de-insert-spellchecker' });
        this.errorText = error;
        var textContainer = createElement('div', {
            className: 'e-de-dlg-spellchecker-subheader', innerHTML: localValue.getConstant('Spelling')
        });
        this.target.appendChild(textContainer);
        var spellContainer = createElement('div', { className: 'e-de-spellcheck-error-container' });
        var listviewDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview', id: 'styles_listview' });
        spellContainer.appendChild(listviewDiv);
        this.spellingListView = new ListView({
            dataSource: [error],
            cssClass: 'e-dlg-spellcheck-listitem',
        });
        this.spellingListView.appendTo(listviewDiv);
        var buttonDiv = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        spellContainer.appendChild(buttonDiv);
        var ignoreButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore'), id: 'ignore' });
        buttonDiv.appendChild(ignoreButtonElement);
        var ignorebutton = new Button({ cssClass: 'e-de-spellcheck-btn' });
        ignorebutton.appendTo(ignoreButtonElement);
        ignoreButtonElement.addEventListener('click', this.onIgnoreClicked);
        var ignoreAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Ignore all'), id: 'new' });
        buttonDiv.appendChild(ignoreAllButtonElement);
        var ignoreAllbutton = new Button({ cssClass: 'e-de-spellcheck-btn' });
        ignoreAllbutton.appendTo(ignoreAllButtonElement);
        ignoreAllButtonElement.addEventListener('click', this.onIgnoreAllClicked);
        // tslint:disable-next-line:max-line-length
        var addDictButtonElement = createElement('button', { innerHTML: localValue.getConstant('Add to Dictionary'), id: 'new' });
        buttonDiv.appendChild(addDictButtonElement);
        var addDictButton = new Button({ cssClass: 'e-de-spellcheck-btn' });
        addDictButton.appendTo(addDictButtonElement);
        addDictButtonElement.addEventListener('click', this.addToDictClicked);
        this.target.appendChild(spellContainer);
        var suggestionDiv = createElement('div', {
            className: 'e-de-dlg-spellchecker-subheaderbtm', innerHTML: localValue.getConstant('Suggestions')
        });
        this.target.appendChild(suggestionDiv);
        var suggestionContainer = createElement('div', { className: 'e-de-spellcheck-suggestion-container' });
        this.target.appendChild(suggestionContainer);
        var suggestListDiv = createElement('div', { className: 'e-de-dlg-spellcheck-listview' });
        suggestionContainer.appendChild(suggestListDiv);
        this.suggestionListView = new ListView({
            dataSource: suggestion,
            cssClass: 'e-dlg-spellcheck-listitem',
        });
        this.suggestionListView.appendTo(suggestListDiv);
        this.suggestionListView.addEventListener('select', this.selectHandler);
        var suggestBtnContainder = createElement('div', { className: 'e-de-spellcheck-btncontainer' });
        suggestionContainer.appendChild(suggestBtnContainder);
        var changeButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change'), id: 'Change' });
        suggestBtnContainder.appendChild(changeButtonElement);
        var changeButton = new Button({ cssClass: 'e-de-spellcheck-btn' });
        changeButton.appendTo(changeButtonElement);
        changeButtonElement.addEventListener('click', this.changeButtonClicked);
        // tslint:disable-next-line:max-line-length
        var changeAllButtonElement = createElement('button', { innerHTML: localValue.getConstant('Change All'), id: 'Change All' });
        suggestBtnContainder.appendChild(changeAllButtonElement);
        var changeAllbutton = new Button({ cssClass: 'e-de-spellcheck-btn' });
        changeAllbutton.appendTo(changeAllButtonElement);
        changeAllButtonElement.addEventListener('click', this.changeAllButtonClicked);
        if (isNullOrUndefined(suggestion) || suggestion.length === 0) {
            changeButton.disabled = true;
            changeAllbutton.disabled = true;
        }
    };
    /**
     * @private
     */
    SpellCheckDialog.prototype.destroy = function () {
        if (this.target) {
            this.target.remove();
            this.target = undefined;
        }
        if (this.spellingListView) {
            this.spellingListView.destroy();
            this.spellingListView = undefined;
        }
        if (this.suggestionListView) {
            this.suggestionListView.destroy();
            this.suggestionListView = undefined;
        }
    };
    return SpellCheckDialog;
}());
export { SpellCheckDialog };
