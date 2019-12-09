export const uiConfig = {
  headerBaseHeight: 50,
  tabBaseHeight: 60
}

export const tabsFrameName = 'bottomTabsNav';
export const gestureUnlockFrameName = 'gestureUnlock';

export const tabOpts = {
  frameGroupName: 'home',
  tabs: [
    {
      text: '首页',
      icon: 'wap-home-o'
    },
    {
      text: '啦啦',
      icon: 'todo-list-o'
    },
    {
      text: '哈哈',
      icon: 'friends-o'
    },
    {
      text: '我的',
      icon: 'user-o'
    }
  ]
};

export const frameGroupOpts = {
  name: 'home',
  frames: [
    {
      name: 'frameGroup-index',
      pathName: 'home',
    },
    {
      name: 'frameGroup-clock',
      pathName: 'clock',
      options: {
        right: true,
        rightOptions: {
          icon: 'clock-o'
        }
      }
    },
    {
      name: 'frameGroup-myhome2',
      pathName: 'home2',
    },
    {
      name: 'frameGroup-my',
      pathName: 'my',
    }
  ]
};

export const homeGridPane = [
  {
    text: '哒哒',
    icon: 'records',
    pathName: 'dada',
    options: {
      right: true,
      rightOpts: {
        icon: 'notes-o'
      }
    }
  },
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }, 
  {
    text: '文字',
    icon: 'photo-o',
    pathName: ''
  }
];


export default uiConfig