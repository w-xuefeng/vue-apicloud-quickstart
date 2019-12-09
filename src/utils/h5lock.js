export class H5lock {
  constructor(obj = {}) {
    this.height = obj.height || 300;
    this.width = obj.width || 300;
    this.errorCount = 1;
    this.maxAllowUnlockCount = 3;
    this.chooseType =
      Number(window.localStorage.getItem('chooseType')) || obj.chooseType || 3;
  }
  setUnlockSuccessCallBack(fn) {
    this.unlockSuccessCallBack = fn;
  }
  setSavePasswordSuccessCallBack(fn) {
    this.savePasswordSuccessCallBack = fn;
  }
  setUnlockFailedCallBack(fn) {
    this.unlockFailedCallBack = fn;
  }
  drawCle(x, y) {
    this.ctx.strokeStyle = '#CFE6FF';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.stroke();
  }
  drawPoint() {
    for (let i = 0; i < this.lastPoint.length; i++) {
      this.ctx.fillStyle = '#CFE6FF';
      this.ctx.beginPath();
      this.ctx.arc(
        this.lastPoint[i].x,
        this.lastPoint[i].y,
        this.r / 2,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
  drawStatusPoint(type) {
    for (let i = 0; i < this.lastPoint.length; i++) {
      this.ctx.strokeStyle = type;
      this.ctx.beginPath();
      this.ctx.arc(
        this.lastPoint[i].x,
        this.lastPoint[i].y,
        this.r,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }
  drawLine(po) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
    for (let i = 1; i < this.lastPoint.length; i++) {
      this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
    }
    this.ctx.lineTo(po.x, po.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  createCircle() {
    var n = this.chooseType;
    var count = 0;
    this.r = this.ctx.canvas.width / (2 + 4 * n);
    this.lastPoint = [];
    this.arr = [];
    this.restPoint = [];
    var r = this.r;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        count++;
        var obj = {
          x: j * 4 * r + 3 * r,
          y: i * 4 * r + 3 * r,
          index: count
        };
        this.arr.push(obj);
        this.restPoint.push(obj);
      }
    }
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.arr.length; i++) {
      this.drawCle(this.arr[i].x, this.arr[i].y);
    }
  }
  getPosition(e) {
    var rect = e.currentTarget.getBoundingClientRect();
    var po = {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
    return po;
  }
  update(po) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    for (let i = 0; i < this.arr.length; i++) {
      this.drawCle(this.arr[i].x, this.arr[i].y);
    }
    this.drawPoint(this.lastPoint);
    this.drawLine(po, this.lastPoint);
    for (let i = 0; i < this.restPoint.length; i++) {
      if (
        Math.abs(po.x - this.restPoint[i].x) < this.r &&
        Math.abs(po.y - this.restPoint[i].y) < this.r
      ) {
        this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
        this.lastPoint.push(this.restPoint[i]);
        this.restPoint.splice(i, 1);
        break;
      }
    }
  }
  checkPass(psw1, psw2) {
    let p1 = '';
    let p2 = '';
    for (let i = 0; i < psw1.length; i++) {
      p1 += psw1[i].index + psw1[i].index;
    }
    for (let i = 0; i < psw2.length; i++) {
      p2 += psw2[i].index + psw2[i].index;
    }
    return p1 === p2;
  }
  storePass(psw) {
    if (this.pswObj.step == 1) {
      if (this.checkPass(this.pswObj.fpassword, psw)) {
        this.pswObj.step = 2;
        this.pswObj.spassword = psw;
        document.getElementById('title').innerHTML = '密码保存成功';
        this.drawStatusPoint('#2CFF26');
        window.localStorage.setItem(
          'passwordxx',
          JSON.stringify(this.pswObj.spassword)
        );
        window.localStorage.setItem('chooseType', this.chooseType);
        this.savePasswordSuccessCallBack &&
          this.savePasswordSuccessCallBack(this.pswObj.spassword);
      } else {
        document.getElementById('title').innerHTML = '两次不一致，重新输入';
        this.drawStatusPoint('red');
        delete this.pswObj.step;
      }
    } else if (this.pswObj.step == 2) {
      if (this.checkPass(this.pswObj.spassword, psw)) {
        document.getElementById('title').innerHTML = '解锁成功';
        this.drawStatusPoint('#2CFF26');
        this.unlockSuccessCallBack && this.unlockSuccessCallBack();
      } else {
        this.drawStatusPoint('red');
        const titleDom = document.getElementById('title');
        const tipsDom = document.getElementById('tips');
        const restCount = this.maxAllowUnlockCount - this.errorCount;
        titleDom.innerHTML = '解锁失败';
        tipsDom.innerHTML = `还剩${restCount}次机会`;
        if (this.errorCount >= this.maxAllowUnlockCount) {
          this.updatePassword();
          return this.unlockFailedCallBack && this.unlockFailedCallBack();
        }
        this.errorCount++;
      }
    } else {
      this.pswObj.step = 1;
      this.pswObj.fpassword = psw;
      document.getElementById('title').innerHTML = '再次输入';
      document.getElementById(
        'tips'
      ).innerHTML = `还剩${this.maxAllowUnlockCount}次机会`;
    }
  }
  makeState() {
    if (this.pswObj.step == 2) {
      document.getElementById('updatePassword').style.display = 'block';
      document.getElementById('title').innerHTML = '请解锁';
      document.getElementById('tips').style.display = 'block';
    } else if (this.pswObj.step == 1) {
      document.getElementById('updatePassword').style.display = 'none';
      document.getElementById('tips').style.display = 'none';
    } else {
      document.getElementById('updatePassword').style.display = 'none';
      document.getElementById('tips').style.display = 'none';
    }
  }
  setChooseType(type) {
    this.chooseType = type;
    this.init();
  }
  updatePassword() {
    window.localStorage.removeItem('passwordxx');
    window.localStorage.removeItem('chooseType');
    this.errorCount = 0;
    this.pswObj = {};
    document.getElementById('title').innerHTML = '绘制解锁图案';
    this.reset();
  }
  initDom(domSelector) {
    var wrap = document.createElement('div');
    var str =
      '<div style="display:flex;flex-direction:column;justify-content:center;">' +
      '<h4 id="title" class="title unlock-title">绘制解锁图案</h4>' +
      `<span id="tips" style="color:#fff;font-size: 10px;display:none;">还剩${this.maxAllowUnlockCount}次机会</span>` +
      '</div>' +
      '<a id="updatePassword" style="position: absolute;right: 10px;bottom: 10px;color:#fff;font-size: 1em;display:none;">重置密码</a>' +
      '<canvas id="canvas" width="300" height="300" style="display: inline-block;margin-top: 15px;"></canvas>';
    wrap.setAttribute(
      'style',
      'padding-top:50%;position: absolute;top:0;left:0;right:0;bottom:0;'
    );
    wrap.innerHTML = str;
    document.querySelector(domSelector).appendChild(wrap);
  }
  init(domSelector) {
    this.initDom(domSelector);
    this.pswObj = window.localStorage.getItem('passwordxx')
      ? {
          step: 2,
          spassword: JSON.parse(window.localStorage.getItem('passwordxx'))
        }
      : {};
    this.lastPoint = [];
    this.makeState();
    this.touchFlag = false;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.createCircle();
    this.bindEvent();
  }
  reset() {
    this.makeState();
    this.createCircle();
  }
  bindEvent() {
    var self = this;
    this.canvas.addEventListener(
      'touchstart',
      function(e) {
        e.preventDefault();
        var po = self.getPosition(e);
        for (var i = 0; i < self.arr.length; i++) {
          if (
            Math.abs(po.x - self.arr[i].x) < self.r &&
            Math.abs(po.y - self.arr[i].y) < self.r
          ) {
            self.touchFlag = true;
            self.drawPoint(self.arr[i].x, self.arr[i].y);
            self.lastPoint.push(self.arr[i]);
            self.restPoint.splice(i, 1);
            break;
          }
        }
      },
      { passive: false }
    );
    this.canvas.addEventListener(
      'touchmove',
      function(e) {
        if (self.touchFlag) {
          self.update(self.getPosition(e));
        }
      },
      false
    );
    this.canvas.addEventListener(
      'touchend',
      function() {
        if (self.touchFlag) {
          self.touchFlag = false;
          self.storePass(self.lastPoint);
          setTimeout(function() {
            self.reset();
          }, 300);
        }
      },
      false
    );
    document.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      { passive: false }
    );
    document
      .getElementById('updatePassword')
      .addEventListener('click', function() {
        self.updatePassword();
        self.unlockFailedCallBack && self.unlockFailedCallBack();
      });
  }
}

const h5lock = new H5lock();
export default h5lock;
