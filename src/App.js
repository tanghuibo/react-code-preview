import React, { useState } from 'react';
import { Button, Card, Col, Input, Row } from 'antd';
import './App.css';
import DynamicCodeRender from './dynamicCodeRender';
import demoTxt from '!!raw-loader!./demo.jsx';

function App() {
  const [text, setText] = useState(demoTxt);
  const [code, setCode] = useState(text);
  const [errorInfo, setErroInfo] = useState(null);
  const onSubmit = () => {
    setCode(text);
    setErroInfo(null);
  }
  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={12}>
          <Card title={
            <Button type='primary' onClick={onSubmit}>提交</Button>
          }>
            <Input.TextArea autoSize value={text} onChange={e => setText(e.target.value)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title= {
            <Button danger={errorInfo != null} type="primary">{errorInfo ? '失败' : '成功'}</Button>
          } >
            {errorInfo ? <p style={{ color: 'red' }}> {errorInfo}</p> : <DynamicCodeRender code={code} onError={e => {
              setErroInfo(e.message);
              console.error(e);
            }} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
