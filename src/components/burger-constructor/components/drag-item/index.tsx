import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorItemStyle from './style.module.sass';
import { TCOnstructorDragItem, TCOnstructorDragItemProps } from "./type";
import { DragTypes } from "../../../app/types";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { Identifier, XYCoord } from "dnd-core";
import { useAppDispatch } from "../../../../services/store";
import { sortConstructor } from "../../../../services/constructor/constructor-slice";

const ConstructorDragItem: React.FC<TCOnstructorDragItemProps> = ({item, index, deleteItemHandle}) => {

    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: DragTypes.SORT_CONSTRUCTOR,
            item: { index },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.5 : 1
            })
        }), []
    );

    const [{ handlerId }, drop] = useDrop<
        TCOnstructorDragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: DragTypes.SORT_CONSTRUCTOR,
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item: TCOnstructorDragItem, monitor) {
          if (!ref.current) return;
          const dragIndex = item.index;
          const hoverIndex = index;
    
          if (dragIndex === hoverIndex) return;
          const hoverBoundingRect = ref.current?.getBoundingClientRect();

          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
    
          const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

          dispatch(sortConstructor({dragIndex, hoverIndex}));
          item.index = hoverIndex;
        }
    });

    drag(drop(ref));

    return (
        <div style={{opacity}} draggable ref={ref} key={item.guid}  data-handler-id={handlerId} className={constructorItemStyle.dragItem}>
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass="ml-1"
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => deleteItemHandle(item.guid)}
            />
        </div>
    );
}

export default ConstructorDragItem;
