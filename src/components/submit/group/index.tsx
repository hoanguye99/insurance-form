import { useAppDispatch } from 'app/hooks'
import { useAppSelector } from 'app/hooks'
import PopUp from 'components/common/pop-up'
import Portal from 'components/common/portal'
import { Button } from 'components/styled'
import { ErrorModal } from '../individual'
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
        <ErrorModal
          failureDescription={failureDescription}
          closeErrorModal={closeErrorModal}
        ></ErrorModal>
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
