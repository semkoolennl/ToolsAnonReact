import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function RedirectLinkCreateForm() {
    const dispatch    = useDispatch();
    const currentLink = useSelector((state: RootState) => state.redirectLinks.currentLink);

    return (
        <div>
            RedirectLinkCreateForm
        </div>
    )
}