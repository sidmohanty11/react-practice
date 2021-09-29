import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NewDisney = () => {
    return (
        <Container>
            <h4>New to Disney+</h4>
            <Content>
                <Wrap>
                    <Link to=''><img src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/12/I-am-Groot-Baby-Groot-Disney.jpg" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://thedirect.s3.amazonaws.com/media/article_full/aco.jpg" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://www.denofgeek.com/wp-content/uploads/2016/11/moana_review_0.jpeg?resize=768%2C432" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://i.ytimg.com/vi/0YtqusNVbzU/maxresdefault.jpg" alt="" /></Link>
                </Wrap>
            </Content>
        </Container>
    )
}

export default NewDisney;

const Container = styled.div`
    padding:0 0 26px;

`;
const Content = styled.div`
    display:grid;
    grid-gap:25px;
    gap:25px;
    grid-template-columns: repeat(4,minmax(0,1fr));

    @media (max-width:768px){
        grid-template-columns: repeat(2,minmax(0,1fr));
    }
`;

const Wrap = styled.div`
    padding-top:56.25%;
    border-radius:10px;
    box-shadow:rgb(0 0 0 /69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor:pointer;
    overflow:hidden;
    position:relative;
    transition:all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
    border:3px solid rgba(249,249,249,0.1);

    img{
        inset:0px;
        display:block;
        height:100%;
        object-fit:cover;
        opacity:1;
        position:absolute;
        transition:opacity 500ms ease-in-out 0s;
        z-index:1;
    }

    &:hover{
        box-shadow:rgb(0 0 0 /69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transform:scale(1.05);
        border-color:rgb(249,249,249,0.8);
    }
`;