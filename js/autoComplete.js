/*
 __________________________________________
/ This is the copy of autoComplete.js in the \
\ documentation repository                 /
 ---------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
 */
(function($) {

/**
 * Attach to an <input type="text"> to provide auto-complete
 *
 * $("#node-red-text").autoComplete({
 *     search: function(value) { return ['a','b','c'] }
 * })
 *
 * options:
 *
 *  search : function(value, [done])
 *           A function that is passed the current contents of the input whenever
 *           it changes.
 *           The function must either return auto-complete options, or pass them
 *           to the optional 'done' parameter.
 *           If the function signature includes 'done', it must be used
 *
 * The auto-complete options should be an array of objects in the form:
 *  {
 *      value: String : the value to insert if selected
 *      label: String|DOM Element : the label to display in the dropdown.
 *  }
 *
 */

    $.widget( "nodered.autoComplete", {
        _create: function() {
            var that = this;
            this.completionMenuShown = false;
            this.options.search = this.options.search || function() { return [] }
            this.element.addClass("red-ui-autoComplete")
            this.element.on("keydown.red-ui-autoComplete", function(evt) {
                if ((evt.keyCode === 13 || evt.keyCode === 9) && that.completionMenuShown) {
                    var opts = that.menu.options();
                    that.element.val(opts[0].value);
                    that.menu.hide();
                    evt.preventDefault();
                }
            })
            this.element.on("keyup.red-ui-autoComplete", function(evt) {
                if (evt.keyCode === 13 || evt.keyCode === 9 || evt.keyCode === 27) {
                    // ENTER / TAB / ESCAPE
                    return
                }
                if (evt.keyCode === 8 || evt.keyCode === 46) {
                    // Delete/Backspace
                    if (!that.completionMenuShown) {
                        return;
                    }
                }
                that._updateCompletions(this.value);
            });
        },
        _showCompletionMenu: function(completions) {
            if (this.completionMenuShown) {
                return;
            }
            this.menu = RED.popover.menu({
                tabSelect: true,
                width: 300,
                maxHeight: 200,
                class: "red-ui-autoComplete-container",
                options: completions,
                onselect: (opt) => { this.element.val(opt.value); this.element.focus() },
                onclose: () => { this.completionMenuShown = false; delete this.menu; this.element.focus()}
            });
            this.menu.show({
                target: this.element
            })
            this.completionMenuShown = true;
        },
        _updateCompletions: function(val) {
            var that = this;
            if (val.trim() === "") {
                if (this.completionMenuShown) {
                    this.menu.hide();
                }
                return;
            }
            function displayResults(completions,requestId) {
                if (requestId && requestId !== that.pendingRequest) {
                    // This request has been superseded
                    return
                }
                if (!completions || completions.length === 0) {
                    if (that.completionMenuShown) {
                        that.menu.hide();
                    }
                    return
                }
                if (that.completionMenuShown) {
                    that.menu.options(completions);
                } else {
                    that._showCompletionMenu(completions);
                }
            }
            if (this.options.search.length === 2) {
                var requestId = 1+Math.floor(Math.random()*10000);
                this.pendingRequest = requestId;
                this.options.search(val,function(completions) { displayResults(completions,requestId);})
            } else {
                displayResults(this.options.search(val))
            }
        },
        _destroy: function() {
            this.element.removeClass("red-ui-autoComplete")
            this.element.off("keydown.red-ui-autoComplete")
            this.element.off("keyup.red-ui-autoComplete")
            if (this.completionMenuShown) {
                this.menu.hide();
            }
        }
    });
})(jQuery);
