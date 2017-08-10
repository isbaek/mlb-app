import Header from './Header';

import stylesheet from 'styles/index.css';

export default (props) =>
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Header />
    <div className="content" children={props.children} />
  </div>
