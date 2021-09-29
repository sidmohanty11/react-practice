import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Originals = () => {
    return (
        <Container>
            <h4>Originals</h4>
            <Content>
                <Wrap>
                    <Link to=''><img src="https://thedirect.s3.amazonaws.com/media/article_full/wv-3.jpg" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/5091/875091-h" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2021/04/25/16193573608089.jpg" alt="" /></Link>
                </Wrap>
                <Wrap>
                    <Link to=''><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxtuwr-yIUs5l-9S0_8ODjDBNn7kGdKWQhg&usqp=CAU" alt="" /></Link>
                </Wrap>
            </Content>
        </Container>
    )
}

export default Originals;

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