import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@heroui/react';

const UniversalModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "lg",
  scrollBehavior = "inside",
  backdrop = "blur",
  primaryAction,
  secondaryAction,
  primaryLoading = false,
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      scrollBehavior={scrollBehavior}
      backdrop={backdrop}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            <ModalBody>
              {children}
            </ModalBody>
            {(footer || primaryAction || secondaryAction) && (
              <ModalFooter>
                {footer || (
                  <>
                    {secondaryAction && (
                      <Button
                        color="danger"
                        variant="light"
                        onPress={async () => {
                          if (secondaryAction.onClick) {
                            await secondaryAction.onClick();
                          }
                          if (secondaryAction.closeOnClick !== false) {
                            onClose();
                          }
                        }}
                      >
                        {secondaryAction.label || 'Cancel'}
                      </Button>
                    )}
                    {primaryAction && (
                      <Button
                        color={primaryAction.color || "primary"}
                        onPress={async () => {
                          if (primaryAction.onClick) {
                            await primaryAction.onClick();
                          }
                        }}
                        isLoading={primaryLoading}
                      >
                        {primaryAction.label || 'Confirm'}
                      </Button>
                    )}
                  </>
                )}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UniversalModal;