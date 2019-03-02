import styled from "@emotion/styled";

const StyledFormGroup = styled("div")`
    
`;

export const FormGroup: React.FC = ({ children }) => (
    <StyledFormGroup>
        { children }
    </StyledFormGroup>
);
