import stylesheet from 'styles/index.css'

export default (props) =>
  <div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div children={props.children} />
  </div>
