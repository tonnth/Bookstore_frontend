import {AsyncStorage} from 'react-native';
import store from "../Store";
import {UPDATE_TOKEN_FROM_LOCAL} from "../Globals";

export async function setToLocal (key, value)
{
    console.log("SET TO LOCAL", key, value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
};

export async function getFromLocal (key)
{
    let res = await AsyncStorage.getItem(key);
    let data = await JSON.parse(res);

    console.log("GET " + key + " FROM LOCAL ", data);
    return data;
};