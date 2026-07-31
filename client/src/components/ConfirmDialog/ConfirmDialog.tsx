import "./ConfirmDialog.css";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmLabel = "Изтрий",
    cancelLabel = "Отказ",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div className="confirm-dialog__overlay" onClick={onCancel}>
            <div
                className="confirm-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="confirm-dialog__accent" />
                <div className="confirm-dialog__body">
                    <h2 id="confirm-dialog-title" className="confirm-dialog__title">{title}</h2>
                    <p className="confirm-dialog__message">{message}</p>
                </div>
                <div className="confirm-dialog__actions">
                    <button type="button" className="confirm-dialog__btn-cancel" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" className="confirm-dialog__btn-confirm" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
