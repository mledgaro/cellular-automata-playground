//

function FAIcon(props) {

    let style = props.iconStyle == null ? "solid" : props.iconStyle;
    let size = props.iconSize == null ? "lg" : props.iconSize;

    return <i className={`fa-${props.iconId} fa-${style} fa-${size}`}></i>
}

export default FAIcon;
