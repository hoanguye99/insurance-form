import { useAppDispatch } from 'app/hooks'
import { useAppSelector } from 'app/hooks'
import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { Button } from 'components/styled'
import { useOrderGroupCreateState } from './hooks'
import ReviewStep from './review-step'
import SubmitStep from './submit-step'

type Props = {}

const Group = (props: Props) => {
  const {
    orderGroupCreateResponse,
    posting,
    showErrorModal,
    closeErrorModal,
    failureDescription,
  } = useOrderGroupCreateState()

  return (
    <>
      {showErrorModal && (
        <Portal>
          <PopUp onClickOutside={() => {}}>
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white animate-popup rounded max-w-md w-full">
              <div className="flex flex-col p-6 gap-12">
                <p className="mx-auto text-red-600">{failureDescription}</p>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => closeErrorModal()}
                    className="w-fit bg-gray-600 hover:bg-gray-500 focus:bg-gray-400 focus:ring-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18"
                      />
                    </svg>
                  </Button>
                  <div></div>
                </div>
              </div>
            </div>
          </PopUp>
        </Portal>
      )}

      <div className="bg-[#f3f4f6]">
        <div className="container mx-auto">
          <p className="text-2xl font-['Muli-ExtraBold'] text-gray-900 mt-5 mb-10">
            Đăng kí nhóm
          </p>
          {orderGroupCreateResponse === undefined ? (
            <SubmitStep posting={posting}></SubmitStep>
          ) : (
            <ReviewStep
              orderGroupCreateResponse={orderGroupCreateResponse}
            ></ReviewStep>
          )}
        </div>
      </div>
    </>
  )
}

export default Group
