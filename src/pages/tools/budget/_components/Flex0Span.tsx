import { styled } from "solid-styled-components";

export const FlexSpan = styled.span<{ flexGrow?: number }>`
    flex: ${(props) => props.flexGrow ?? 0} 0 auto;
`;
