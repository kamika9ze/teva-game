'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  // Common scripts

  document.addEventListener('DOMContentLoaded', function (e) {

    // Modal
    // -----
    var Modal = function () {
      function Modal() {
        _classCallCheck(this, Modal);
      }

      _createClass(Modal, [{
        key: 'init',
        value: function init() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          this._m = options.modal;
        }
      }, {
        key: 'show',
        value: function show() {
          document.body.classList.add('page_modal_show');
        }
      }, {
        key: 'hide',
        value: function hide(e) {
          e.preventDefault();

          document.body.classList.remove('page_modal_show');
        }
      }]);

      return Modal;
    }();

    var modal = new Modal();

    // Modal_game
    // -----

    var Modal_game = function (_Modal) {
      _inherits(Modal_game, _Modal);

      function Modal_game() {
        _classCallCheck(this, Modal_game);

        return _possibleConstructorReturn(this, (Modal_game.__proto__ || Object.getPrototypeOf(Modal_game)).apply(this, arguments));
      }

      _createClass(Modal_game, [{
        key: 'init',
        value: function init() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          this._m = options.modal;
          this._mAns = this._m.querySelector('.modal__answer');
          this._mPrc = this._m.querySelector('.modal__value_precision');
          this._mPc = this._m.querySelector('.modal__value_price');
        }
      }, {
        key: 'show',
        value: function show(prc, pc, msg) {
          this._mPrc.innerHTML = prc + '%';
          this._mPc.innerHTML = pc + ' руб.<sup>*</sup>';
          this._mAns.innerHTML = msg;

          _get(Modal_game.prototype.__proto__ || Object.getPrototypeOf(Modal_game.prototype), 'show', this).call(this);
        }
      }]);

      return Modal_game;
    }(Modal);

    var modal_game = new Modal_game();

    // Slider
    // ------

    var Slider = function () {
      function Slider() {
        _classCallCheck(this, Slider);
      }

      _createClass(Slider, [{
        key: 'init',
        value: function init() {
          this._slider = document.querySelector('.game__scale');
          this._thumb = this._slider.querySelector('.game__box-img');
          this._amount = document.querySelector('.game__amount');

          this._val = this._amount.value;

          this._maxVal = this._amount.max;
          this._minVal = this._amount.min;

          this._price = this.getPrice();
          this._step = this._maxVal / 6;

          this._lastShitY = null;
          this._played = null;

          this.enable();
        }
      }, {
        key: 'enable',
        value: function enable() {
          this._thumb.addEventListener('mousedown', this._drag.bind(this));
          this._thumb.addEventListener('touchstart', this._drag.bind(this));
        }
      }, {
        key: '_drag',
        value: function _drag(e) {
          document.body.classList.add('page_hidden');

          var pageY = e.touches ? e.touches[0].pageY : e.pageY;

          this._shiftY = pageY - this._getTopCoord();

          if (!this._played) {
            this._moveF = this._move.bind(this);
            this._dropF = this._drop.bind(this);
          }

          this._thumb.addEventListener('mousemove', this._moveF);
          this._thumb.addEventListener('touchmove', this._moveF);
          document.addEventListener('mouseup', this._dropF);
          document.addEventListener('touchend', this._dropF);
          document.addEventListener('touchcancel', this._dropF);

          e.preventDefault();
        }
      }, {
        key: '_move',
        value: function _move(e) {

          var pageY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;

          var shiftY = pageY - this._shiftY;

          if (!this._lastShitY) {
            this._lastShitY = shiftY;
          }

          this._translateY = -(this._lastShitY - shiftY);

          if (this._translateY > 150) {
            this._translateY = 150;

            this.setTranslateY();
            this.showValue();

            return;
          }

          if (this._translateY < -150) {
            this._translateY = -150;

            this.setTranslateY();
            this.showValue();

            return;
          }

          this.showValue();
          this.setTranslateY();
        }
      }, {
        key: '_drop',
        value: function _drop() {
          document.body.classList.remove('page_hidden');

          this._thumb.removeEventListener('mousemove', this._moveF);
          this._thumb.removeEventListener('touchmove', this._moveF);
          document.removeEventListener('touchend', this._dropF);

          this._played = true;
        }
      }, {
        key: 'showValue',
        value: function showValue() {
          this._amount.value = this._getValue();
        }
      }, {
        key: 'setTranslateY',
        value: function setTranslateY() {
          this._thumb.style.transform = 'translateY(' + this._translateY + 'px)';
        }
      }, {
        key: '_getTopCoord',
        value: function _getTopCoord() {
          return this._thumb.getBoundingClientRect().top;
        }
      }, {
        key: 'getPrecision',
        value: function getPrecision() {
          if (this._getValue() >= this._price && this._getValue() <= this._price * 2) {
            return Math.round(Math.abs(this._getValue() * (100 / this._price) - 200));
          } else if (this._getValue() <= this._price) {
            return Math.round(this._getValue() * (100 / this._price));
          } else {
            return 0;
          }
        }
      }, {
        key: '_getValue',
        value: function _getValue() {
          if (!this._translateY) this._translateY = 0;

          return Math.round((-this._translateY + 150) * this._step / 50);
        }
      }, {
        key: 'getPrice',
        value: function getPrice() {
          return this._amount.dataset.price;
        }
      }, {
        key: 'getAmount',
        value: function getAmount() {
          return this._amount;
        }
      }]);

      return Slider;
    }();

    var slider = new Slider();

    // Game
    // ----

    var Game = function () {
      function Game() {
        _classCallCheck(this, Game);
      }

      _createClass(Game, [{
        key: 'init',
        value: function init() {
          var _this2 = this;

          this._isMainPage = document.body.classList.contains('page_main');
          this._isResultsPage = document.body.classList.contains('page_results');

          if (this._isMainPage) {
            var drugs = document.querySelector('.drugs');

            drugs.addEventListener('click', function (e) {
              var target = e.target,
                  group = target.closest('[data-group]');

              if (group) {
                _this2._setGroup(group.pathname);
              }
            });

            this._clearStorage();
          }

          if (this._isResultsPage) {
            this._rc = document.querySelector('.results__count');

            var repeat = document.querySelector('.link_repeat');

            if (repeat) {
              repeat.href = this._getGroup();

              repeat.addEventListener('click', function (e) {
                _this2._clearStorage();
              });
            }

            this._showResults();
          }

          var complete = document.querySelector('[data-complete]');

          if (complete) {
            localStorage.setItem('complete', complete.dataset.complete);
            complete.addEventListener('click', function (e) {
              e.preventDefault();

              var res = _this2._getResults(),
                  pct = Math.round(res.count * 100 / res.complete);

              console.dir(pct);

              if (pct == 100) {
                window.parent.location = 'https://www.doktornarabote.ru/Page/1001404';
              } else if (pct >= 50) {
                window.parent.location = 'https://www.doktornarabote.ru/Page/1001405';
              } else {
                window.parent.location = 'https://www.doktornarabote.ru/Page/1001406';
              }
            });
          }

          if (!localStorage.getItem('count')) {
            localStorage.setItem('count', 0);
          }

          this._msgs = ['Верно!', 'Вы были близки <br> к правильному ответу!', 'Хорошая попытка, но данный <br> препарат доступнее <br> для  пациентов!', 'Хорошая попытка, но данный <br> препарат относится к средней ценовой <br> категории!'];

          this._clss = ['page_modal_correct', 'page_modal_close', 'page_modal_afford', 'page_modal_average'];

          // Init Modules
          this._modal();
          this._modal_game();
          this._slider();
        }
      }, {
        key: '_modal',
        value: function _modal() {
          this._m = document.querySelector('.modal');

          if (this._isMainPage && this._m) {
            modal.init();
            modal.show();

            this._mHideAct = this._m.querySelector('[data-hide]');

            this._mHideAct.addEventListener('click', modal.hide);
          }
        }
      }, {
        key: '_modal_game',
        value: function _modal_game() {
          var _this3 = this;

          this._mg = document.querySelector('.game__modal');

          if (this._mg) {
            var _setMCls = function _setMCls(cls) {
              document.body.classList.add(cls);
            };

            modal_game.init({
              modal: this._mg
            });

            var mgShowAct = document.querySelector('[data-show]');

            mgShowAct.addEventListener('click', function (e) {
              var prc = slider.getPrecision(),
                  pc = slider.getPrice(),
                  val = slider._getValue(),
                  msg = null;

              var amt = slider.getAmount();

              if (prc >= 90) {
                _setMCls(_this3._clss[0]);
                msg = _this3._msgs[0];

                _this3._setCount();
              } else if (prc >= 80) {
                _setMCls(_this3._clss[1]);
                msg = _this3._msgs[1];

                _this3._setCount();
              } else {

                if (val > pc) {
                  _setMCls(_this3._clss[2]);
                  msg = _this3._msgs[2];
                } else {
                  _setMCls(_this3._clss[3]);
                  msg = _this3._msgs[3];
                }
              }

              amt.disabled = true;
              modal_game.show(prc, pc, msg);
            });
          }
        }
      }, {
        key: '_slider',
        value: function _slider() {
          this._s = document.querySelector('.slider');

          if (this._s) {
            slider.init();
          }
        }
      }, {
        key: '_setCount',
        value: function _setCount() {
          var count = localStorage.getItem('count');

          localStorage.setItem('count', ++count);
        }
      }, {
        key: '_clearStorage',
        value: function _clearStorage() {
          localStorage.removeItem('count');
          localStorage.removeItem('complete');
        }
      }, {
        key: '_showResults',
        value: function _showResults() {
          var res = this._getResults(),
              count = res.count,
              complete = res.complete;

          this._rc.innerHTML = count + ' из ' + complete;
        }
      }, {
        key: '_getResults',
        value: function _getResults() {
          var res = {
            count: localStorage.getItem('count'),
            complete: localStorage.getItem('complete')
          };

          return res;
        }
      }, {
        key: '_setGroup',
        value: function _setGroup(val) {
          localStorage.setItem('group', val);
        }
      }, {
        key: '_getGroup',
        value: function _getGroup() {
          return localStorage.getItem('group');
        }
      }]);

      return Game;
    }();

    var game = new Game();
    game.init();
  });
})();