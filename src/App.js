import HTMLFlipBook from 'react-pageflip';
import React, {useState} from 'react';
import useWindowDimensions from './windowDimensions';
import './App.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace('./', '')] = r(item)));
  return images;
}

const images = Object.assign(importAll(require.context('../public/vol1', false, /\.(png|jpe?g|svg)$/)), importAll(require.context('../public/vol2', false, /\.(png|jpe?g|svg)$/)),  importAll(require.context('../public/vol3', false, /\.(png|jpe?g|svg)$/)));
const values = Object.keys(images).map(function(k){return images[k]});

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <img src={values[props.number]} style={{height: "inherit", width: "inherit"}} alt="Magazine Page Cover"/>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
      <div className="demoPage" ref={ref} data-density="soft">
          <img src={values[props.number]} style={{height: "inherit", width: "inherit"}} alt="Magazine Page"/>
      </div>
  );
});

var pagesList = [];
for (var i = 1; i < values.length-1; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    pagesList.push(<Page number={i} key={i}/>);
}
console.log(pagesList);

function App() {
  const { height, width } = useWindowDimensions();
  const [magazine, setMagazine] = useState('');
    return (
      <div>
        <div className="page page-cover" data-density="hard" style={{width: "initial", display: `${magazine===''?'flex':'none'}`, height: "100vh", justifyContent: "center", alignItems: "center"}}>
          <button class="first" onClick={()=> setMagazine(
          <HTMLFlipBook width={width > height/1.58 ? height/1.58 : width} height={height}>
            <PageCover number="0">Human Amelioration Vol. 1</PageCover>
            {pagesList.splice(0,49)}
            <PageCover number="50">The End</PageCover>
          </HTMLFlipBook>
          )}>Volume 1</button>
          <button class="sec" onClick={()=> setMagazine(
          <HTMLFlipBook width={width > height/1.58 ? height/1.58 : width} height={height}>
            <PageCover number="51">Human Amelioration Vol. 1</PageCover>
            {pagesList.splice(51)}
            <PageCover number="98">The End</PageCover>
          </HTMLFlipBook>
          )}>Volume 2</button>
          <button class="third" onClick={()=> setMagazine(
          <HTMLFlipBook width={width > height/1.58 ? height/1.58 : width} height={height}>
            <PageCover number="99">Human Amelioration Vol. 1</PageCover>
            {pagesList.splice(99)}
            <PageCover number="238">The End</PageCover>
          </HTMLFlipBook>
          )}>Volume 3</button>
        </div>
        {magazine}
      </div>
  );
}

export default App;
