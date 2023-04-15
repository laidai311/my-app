import React, { useEffect, useRef, useState } from 'react';

function MyComponent() {
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      const newHeight = elementRef.current.getBoundingClientRect().height;
      setHeight(newHeight);
      elementRef.current.style.color = 'red'; // Đặt một style cho phần tử
    }
  }, []);

  return (
    <div ref={elementRef} id="my-element">
      {/* Nội dung của phần tử */}
    </div>
  );
}

const data = [];
function createData() {
  for (let i = 0; i < 1000000; i++) {
    data.push({ name: `Row ${i}` });
  }
}
createData();

//Item class to render each of the list rows
class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="item"
        style={{ top: this.props.top, height: this.props.itemheight }}
      >
        {this.props.label}
      </div>
    );
  }
}

//The list component that contains the rows and manage the virtual rendering
// using the vertical scroll position
class Vlist extends React.Component {
  constructor(props) {
    super(props);
    this.numVisibleItems = Math.trunc(300 / this.props.itemheight);
    this.state = {
      start: 0,
      end: this.numVisibleItems,
    };
    this.containerStyle = { height: data.length * this.props.itemheight };

    this.scollPos = this.scollPos.bind(this);
  }

  scollPos() {
    let currentIndx = Math.trunc(
      this.refs.viewPort.scrollTop / this.props.itemheight
    );
    currentIndx =
      currentIndx - this.numVisibleItems >= data.length
        ? currentIndx - this.numVisibleItems
        : currentIndx;
    if (currentIndx !== this.state.start) {
      console.log('Redraw');
      this.setState(
        (this.state = {
          start: currentIndx,
          end:
            currentIndx + this.numVisibleItems >= data.length
              ? data.length - 1
              : currentIndx + this.numVisibleItems,
        })
      );
    }
  }

  renderRows() {
    let result = [];
    for (let i = this.state.start; i <= this.state.end; i++) {
      let item = data[i];
      result.push(
        <Item
          key={i}
          label={item.name}
          top={i * this.props.itemheight}
          itemheight={this.props.itemheight}
        />
      );
    }
    return result;
  }

  render() {
    return (
      <div ref="viewPort" className="viewPort" onScroll={this.scollPos}>
        <div className="itemContainer" style={this.containerStyle}>
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Vlist itemheight={30} />, document.querySelector('#app'));
