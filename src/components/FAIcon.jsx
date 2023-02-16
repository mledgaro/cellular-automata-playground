//

export default function FAIcon({ icon }) {
    //
    
    icon.style = icon.style == null ? "solid" : icon.style;
    icon.size = icon.size == null ? "lg" : icon.size;

    return <i className={`fa-${icon.id} fa-${icon.style} fa-${icon.size}`}></i>;
}
