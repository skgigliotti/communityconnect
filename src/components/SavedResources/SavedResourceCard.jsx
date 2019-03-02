import React from "react";
import styled from "@emotion/styled";
import { Card } from "../Common";

const StyledSavedResourceCard = styled(Card)`

`;

const SavedResourceCardBody = styled("div")`

`;

const SavedResourceCardSubtitle = styled("span")`

`;

export const SavedResourceCard = ({ 
    website, 
    categoryautosortscript,
    distance, 
    distanceElement,
    location, 
    name,
    overview,
    phone, 
    facebookUrl, 
    instagramUrl, 
    twitterUrl,
    removeItem
}) => (
    <StyledSavedResourceCard>
        <SavedResourceCardBody>
            {
                website &&
                    <>
                        <a href={website}><span role={'img'} aria-label={'Link to website'}>&#128279;</span></a>
                    </>
            }
            <h3>{name}</h3>
            <span
                title='Remove item from Saved Resources'
                aria-label='Remove item from Saved Resources'
                onClick={removeItem}>
                -
            </span>
            <SavedResourceCardSubtitle>
                {categoryautosortscript}
            </SavedResourceCardSubtitle>
            {
                distance &&
                    {distanceElement}
            }
            {
                location &&
                <>
                    <span className="fa fa-map-o"></span>
                    {location}
                </>
            }
            {
                overview &&
                    <p>{overview}</p>
            }
            {
                phone &&
                    <p><span role={'img'} aria-label={'Phone number'}> &#128222;</span> {phone}</p>
            }
            {
                (facebookUrl || instagramUrl || twitterUrl) &&
                    <ul className="list-inline">
                        {
                            facebookUrl &&
                                <li>
                                    <a href={facebookUrl} data-type="social">
                                        <i className="fa fa-2x fa-facebook-square">{facebookUrl}</i>
                                    </a>
                                </li>
                        }
                        {
                            instagramUrl &&
                                <li>
                                    <a href={instagramUrl} data-type="social">
                                        <i className="fa fa-2x fa-facebook-square">{instagramUrl}</i>
                                    </a>
                                </li>
                        }
                        {
                            twitterUrl &&
                                <li>
                                    <a href={twitterUrl} data-type="social">
                                        <i className="fa fa-2x fa-facebook-square">{twitterUrl}</i>
                                    </a>
                                </li>
                        }
                    </ul>
                }
        </SavedResourceCardBody>
    </StyledSavedResourceCard>
);
