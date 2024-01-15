
import styled from 'styled-components';
import { MdThumbUp, MdThumbDown, MdEdit, MdVisibility, MdClose, MdDelete, MdSend, MdLogout, MdPermIdentity, MdReport, MdPrint, MdHistory, MdImage } from 'react-icons/md';

const primaryColor = '#0095f6';
const warningColor = '#F5C718';
const dangerColor = '#F55A18';
const grayColor = '#F2F2F2'
const titleColor = '#3B5E75 ';
const textColor = '#181818';
const borderColor = '#3B5E75';
const iconSizeSmall = '15px';
const iconSizeLarger = '32px';

export const Title = styled.h2`
  font-size: 19px;
  text-align: center;
  color: ${titleColor};
  display: flex;
  align-items: flex-end;
`;

export const TitleSmall = styled.h2`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
  color: ${titleColor};
  margin-bottom: 10px;
`;

export const Description = styled.h4`
  font-size: 14px;
  font-weight: 400;
  color: ${textColor};
`;

export const DescriptionSmall = styled.h4`
  font-size: 11px;
  text-align: center;
  font-weight: 400;
  color: ${textColor};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* Allow vertical resizing */
`;

export const ErrorMessage = styled.p`
  color: #ed4956;
  margin-top: 10px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  max-width: 400px;
`;

export const SubmitButton = styled.button`
  margin-top: 4px;
  margin-bottom: 4px;
  background-color:  ${primaryColor};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #357ae8;
  }

  &:disabled {
    background-color: #b2dffc;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled.button`
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: ${dangerColor};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  &:hover {
    background-color: #e63946;;
  }

  &:disabled {
    background-color: #f1a1ae;
    cursor: not-allowed;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const AuthContainer = styled.div`
  text-align: center;
  width: 320px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${borderColor};
`;

export const SwitchAuthLink = styled.span`
  margin-top: 10px;
  color: #00376b;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #001f3f;
  }
`;

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${borderColor};
  height: 60px;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${textColor};
  margin-bottom: 6px;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 400px;
  max-height: 600px;
  overflow: hidden;
`;

export const CloseButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const HomeContainer = styled.div`
  
  max-width: 400px;
  margin: 0 auto;
  margin-top: 120px;
`;

export const FormPost = styled.form`
  display: flex;
  flex-direction: column;
`;

export const PostBarButton = styled.button`
  background-color: #FEFEFE;
  color: ${textColor};
  padding: 10px;
  border: 2px solid ${borderColor} ;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 400px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PostContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PostTitle = styled.h2`
  margin-bottom: 10px;
`;

export const PostActions = styled.div`
  display: flex;
`;

export const PostAction = styled.div`
  cursor: pointer;
  margin-left: 10px;

  svg {
    font-size: 1.5rem;
  }
`;

export const PostStats = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

export const CommentInput = styled.input`
  
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SendButton = styled.button`
  margin-left: -20px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const CommentList = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow-y: auto;
`;

export const CommentItem = styled.div`
  background-color: ${grayColor};
  border-radius: 4px;
  padding: 4px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;



export const EditButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const InputFile = styled.div`
  margin-top: 10px;

  input[type="file"] {
    display: none;
  }

  label {
    display: flex;
    cursor: pointer;
    padding: 15px 15px;
    height: 50px;
    width: 50px;
    align-items: center;
    justify-content: center;
    background-color: ${borderColor}; 
    color: #fff; 
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
    svg {
      width: 20px;
      height: 20px;
      fill: #fff; 
    }
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px; 
  margin-top: 10px;
`;

export const ImageIcon = styled(MdImage)`
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  color: ${borderColor};
`;
//icones
export const EditIcon = styled(MdEdit)`
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  margin-right: 5px;
  color: ${borderColor};
`;

export const HistoryIcon = styled(MdHistory)`
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  margin-right: 5px;
  color: ${borderColor};
`;

export const LikeIcon = styled(MdThumbUp)`
  margin-right: 5px;
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  color: ${primaryColor};
`;

export const UnlikeIcon = styled(MdThumbDown)`
  margin-right: 5px;
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  color: ${dangerColor};
`;

export const ViewIcon = styled(MdVisibility)`
  margin-right: 5px;
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  color: ${warningColor};
`;

export const DeleteIcon = styled(MdDelete)`
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  margin-right: 5px;
  color: ${borderColor};
`;

export const CloseIcon = styled(MdClose)`
  height: ${iconSizeLarger};
  width: ${iconSizeLarger};
  margin-right: 5px;
  color: ${borderColor};
`;

export const SendIcon = styled(MdSend)`
  height: ${iconSizeSmall};
  width: ${iconSizeSmall};
  color: ${primaryColor};
`;

export const LogoutIcon = styled(MdLogout)`
  height: 32px;
  width: 32px;
  color: ${grayColor};
  cursor: pointer;
`;

export const PerfilIcon = styled(MdPermIdentity)`
  height: ${iconSizeLarger};
  width: ${iconSizeLarger};
  color: ${grayColor};
  cursor: pointer;
`;

export const ReportIcon = styled(MdPrint)`
  height: ${iconSizeLarger};
  width: ${iconSizeLarger};
  color: ${grayColor};
  cursor: pointer;
`;