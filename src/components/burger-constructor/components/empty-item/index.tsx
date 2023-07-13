import { EmptyItemTypes, TEmptyItemProps } from "./types";
import emptyItemStyle from './style.module.sass';

const EmptyItem: React.FC<TEmptyItemProps> = ({type = EmptyItemTypes.CENTER, text, active = false}) => {

    const extraClass = type === EmptyItemTypes.TOP 
        ? 'constructor-element_pos_top'
        : (
            type === EmptyItemTypes.BOTTOM
                ? 'constructor-element_pos_bottom'
                : ''
        )

    return (
        <div className={`constructor-element ml-7 ${emptyItemStyle.item} ${extraClass} ${active && emptyItemStyle.active}`}>
            <span className="constructor-element__row">
                <span className="constructor-element__text">{text}</span>
            </span>
        </div>
    );
}

export default EmptyItem;