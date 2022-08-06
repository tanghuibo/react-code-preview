import React, { useState } from 'react';
import { Button, Card, Col, Input, Row } from 'antd';
import './App.css';
import DynamicCodeRender from './dynamicCodeRender';

const autoSize = { minRows: 25, maxRows: 25 };
function App() {
  const [text, setText] = useState("");
  const [code, setCode] = useState(null);
  const [errorInfo, setErroInfo] = useState(null);
  const onSubmit = () => {
    setCode(text);
    setErroInfo(null);
  }
  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ height: '90vh' }} title={
            <Button type='primary' onClick={onSubmit}>提交</Button>
          }>
            <Input.TextArea autoSize={autoSize} value={text} onChange={e => setText(e.target.value)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ height: '90vh' }} title={
            <div style={{ height: 32 }}></div>
          }>
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
