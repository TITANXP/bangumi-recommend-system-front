import React from 'react'
import {Link,Route} from 'react-router-dom';
import AnimeGrid from '../../components/AnimeGrid';
import PubSub from 'pubsub-js';
import '../../config';

export default function Home() {
    const [userId, setUserId] = React.useState(-1);

    let userSub;
    React.useEffect(() => { // 函数式组件的hook，空数组表示什么也不监听，只在初始化时执行，如果不写则监听所有状态
        userSub = PubSub.subscribe('user', (msg, data) => {
            setUserId(data.id)
        })
        return () => { // 在组件卸载前执行，相当于类式组件的componentWillUnmount()
            PubSub.unsubscribe(userSub)
        }
    }, []) 

    return (
        <div>
            {localStorage.getItem("userId") 
                ? <AnimeGrid url={global.constants.BACKEND_URL + "/getRec?model=emb&id=" + localStorage.getItem("userId") }/>
                : <AnimeGrid url={global.constants.BACKEND_URL + "/getRec?model=emb&id=" + userId}/>
            }
        </div>
    )
}
