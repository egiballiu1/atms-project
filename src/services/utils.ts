import { avatarList } from "../mock/avatars";

const ms = 500

const putCallToSleep = () => new Promise(resolve => setTimeout(resolve, ms))

const getRandomAvatar = () => {
    return avatarList[Math.floor(Math.random() * avatarList.length)];
  };

export { putCallToSleep, getRandomAvatar }


