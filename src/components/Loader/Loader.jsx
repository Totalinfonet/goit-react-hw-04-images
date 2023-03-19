import { Blocks } from 'react-loader-spinner';

const Loader = () => (
  <div className="loader">
    <Blocks
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
    />
  </div>
);

export default Loader;
