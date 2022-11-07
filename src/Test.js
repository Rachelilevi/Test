import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Test() {

    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('./data.json')
            .then(result => {
                console.log(result);
                setData(result.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    let colors = [];

    const displayData = (array, level) => {
        level++;
        colors[level] === undefined &&
            colors.push(Math.floor(Math.random() * 16777215).toString(16));
        return array && array.map(x =>
            <div className={``} style={{
                margin: '2px',
                padding: '3px',
                textAlign: 'left',
                border: `1px solid green`,
                borderRadius: '15px',
                backgroundColor: `#${colors[level]}`,
                display: `${level === 0 ? 'inline-block' : 'block'}`,
                verticalAlign: 'top',
                width: `${level === 0 ? '280px' : '80%'}`,
                float: `${level !== 0 && 'right'}`
            }}>
                <div>Id: {x.id}</div>
                <div>Site Name: {x.name}</div>
                <a href={x.url}>Site Url: {x.url.split('.')[1]}</a>
                {
                    x.subData && displayData(x.subData, level)
                }
            </div>
        )
    }

    return (
        <div>
            {
                displayData(data, -1)
            }
        </div>
    );
}