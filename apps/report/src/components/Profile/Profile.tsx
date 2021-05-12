/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { EasyLabsSex } from '@easy-labs-int/shared';

import { InputsTypes } from 'constants/enums';

import { ProfileProps, ProfileType } from './Profile.types';
import { useStyles } from './styles';

export const AdultMapLabelsKids = {
  [EasyLabsSex.DSNT_MATTER]: 'Kid',
  [EasyLabsSex.MALE]: 'Boy',
  [EasyLabsSex.FEMALE]: 'Girl',
};
export const AdultMapLabels = {
  [EasyLabsSex.DSNT_MATTER]: 'Adult',
  [EasyLabsSex.MALE]: 'Male',
  [EasyLabsSex.FEMALE]: 'Female',
};

const isSwitchEvent = (event: any, type: InputsTypes): event is React.ChangeEvent<HTMLInputElement> =>
  type === InputsTypes.SWITCH;

const Profile: FC<ProfileProps> = ({ onChangeProfile, profileState, onSaveProfile }) => {
  const classes = useStyles();

  const { age, sex } = profileState;
  const isKids = age < 18;

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>,
    type: InputsTypes,
    nameField: keyof ProfileType
  ) => {
    if (isSwitchEvent(event, type)) {
      const { checked } = event.target;
      return onChangeProfile(nameField)(checked as boolean);
    }
    if (type === InputsTypes.NUMBER) {
      const { value } = event.target;
      return onChangeProfile(nameField)(parseInt(value as string, 10));
    }
    const { value } = event.target;
    return onChangeProfile(nameField)(value as string);
  };

  const handlerAge = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { value } = event.target;
    if ((value as number) > 120) {
      return onChangeProfile('age')(120 as number);
    }
    return onChangeProfile('age')(parseInt(value as string, 10));
  };

  return (
    <Box className={classes.contentModal} p={3} display="flex" flexDirection="column">
      <Box mb={1} width="100%">
        <FormControl fullWidth>
          <InputLabel htmlFor="formatted-text-mask-input">Age</InputLabel>
          <Input
            inputProps={{
              min: 0,
              max: 150,
              pattern: '[0-9]*',
            }}
            type="number"
            value={age}
            onChange={handlerAge}
            name="Age"
          />
        </FormControl>
      </Box>

      <Box mb={1} width="100%">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sex</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            onChange={(event) => onChangeInput(event, InputsTypes.DEFAULT, 'sex')}
          >
            <MenuItem value={EasyLabsSex.MALE}>
              {isKids ? AdultMapLabelsKids[EasyLabsSex.MALE] : AdultMapLabels[EasyLabsSex.MALE]}
            </MenuItem>
            <MenuItem value={EasyLabsSex.FEMALE}>
              {isKids ? AdultMapLabelsKids[EasyLabsSex.FEMALE] : AdultMapLabels[EasyLabsSex.FEMALE]}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box p={2} overflow="auto" maxHeight={300} mb={1} mt={1} border={1}>
        <Typography gutterBottom align="center">
          {' '}
          EasyLabs Terms of Service and Disclaimer (the “Terms of Service”){' '}
        </Typography>
        Easylabs Inc. and/or its affiliates (“Easylabs”, '"we", "us", or "our") provide website content, functionality,
        and other services to you when your visit or make a purchase at www.easylabs.org (the "Website") or remotely
        through any Easylabs partner (collectively, the "Services"). The following Terms of Service forms a binding
        agreement between you and us, whether or not you register or pay to become a user ("Registered User") or browse
        the Website as a "Visitor", where '"you" or "your" refers to the person accessing or using the Website.
        Registered Users and Visitors may be referred to collectively as "Users". PLEASE READ THE FOLLOWING TERMS OF
        SERVICE CAREFULLY BEFORE USING OUR SERVICES. By accessing the Services you agree to be bound and abide by these
        Terms of Service. We may at our sole discretion change, add, or delete portions of these Terms of Service at any
        time on a going-forward basis. It is your responsibility to check these Terms of Service prior to the use of the
        Website and Services, and in any event your continued use of the Website and Services following the posting of
        changes to these Terms of Service constitutes your acceptance of any changes. You agree that by using our
        Website and Services, you are at least 18 years of age. No Medical Advice The information contained on this
        Website, or provided at your request, is for informational purposes only. No information on this Website is or
        should be used for the purposes of diagnosing, treating, curing or preventing any disease. The information on
        this Website has not been evaluated by the Food and Drug Administration. Nothing on this Website is intended to
        recommend any particular form of medical treatment or that individuals manage their own health problems without
        the advice of a licensed health care practitioner. You should absolutely consult a qualified medical
        professional before making any health decision or taking any product. Information found or received through this
        website should not be used in place of a visit with, call to, consultation or advice from a professional health
        care provider. If you suspect you have a medical problem, or should you have any health care related questions,
        please promptly call or see your health care practitioner. No information on this site should be used to
        diagnose, treat, prevent or cure any disease or condition under any circumstances. Access Rights We hereby grant
        to you a limited, non-exclusive, nontransferable access right to access the Website and Services solely for your
        personal non-commercial use, unless explicitly agreed to by us in writing, only as permitted under these Terms
        of Service ("Access Rights"). You agree that you will not, and will not attempt to: • Interfere in any manner
        with the operation of the Website and Services, or the hardware and network used to operate the Website and
        Services; • Distribute, sell, lease, rent, sublicense, assign, export, or transfer in any other manner any of
        your rights under these Terms of Service or otherwise use the Website or Services for the benefit of a third
        party or to operate a service bureau; • Modify, copy or make derivative works based on any part of the Website
        and Sevices, or any underlying software, technology or other information, including any printed materials of the
        same; • Create Internet "links" to or from the Website, or "frame" or "mirror" any of Easylabs’ content which
        forms part of the Website; • Otherwise use the Website and/or Services in any manner that exceeds the scope of
        use granted above. Any use of third party software provided in connection with the Website will be governed by
        such third parties' licenses and not by these Terms of Service. We reserve the right, in our sole discretion, to
        deny use of the Website to anyone for any reason. Your Responsibilities and Acceptable Use of The Website You
        agree NOT to use the Website and Services to: • violate any local, state, national or international law; •
        stalk, harass or harm another individual; • collect or store personal data about other users; • impersonate any
        person or entity, or otherwise misrepresent your affiliation with a person or entity; • interfere with or
        disrupt the Website and Services or servers or networks connected to the Website and Services, or disobey any
        requirements, procedures, policies or regulations of networks connected to the Website. You agree not to
        reproduce, duplicate, copy, sell, resell or exploit any portion of the Website, use of the Website and Services
        or access to the Website and Services for any purposes other than for which the Website is being provided to
        you. You may not reverse engineer, disassemble, decompile, or translate any components of the Website and
        Services, attempt to derive the source code of any components of the Website and Services, or authorize or
        assist any third party to do any of the foregoing. Without our written consent, you may not: • allow, enable, or
        otherwise support the transmission of mass unsolicited, commercial advertising or solicitations via e-mail
        (SPAM); • use any high volume, automated, or electronic means to access the Website and Services (including
        without limitation robots, spiders or scripts); • frame the Website, place pop-up windows over its pages, or
        otherwise affect the display of its pages. Use of the Website and Services requires that you comply with certain
        acceptable use policies we may establish from time-to-time. As part of your responsibilities as a Visitor or a
        Registered User of the Website, you agree that you will not: • use the Website in a manner that is unlawful,
        harmful to minors, threatening, harassing, abusive, defamatory, slanderous, vulgar, gratuitously violent,
        obscene, pornographic, indecent, lewd, libelous, invasive of another's privacy, or racially, ethnically or
        otherwise offensive, hateful or abusive; • infringe someone else's patent, trademark, trade secret, copyright or
        other intellectual property or other rights; • use the Website for unsolicited or unauthorized advertising, junk
        or bulk e-mail (SPAM), chain letters, letters relating to a pyramid scheme or any other unsolicited commercial
        or non-commercial communication; • interfere with others using the Website and Services; • use the Website in
        any manner that uploads or otherwise spreads any software viruses, worms, time bombs, corrupted files, Trojan
        horses or any other computer code, files, or programs that are designed or intended to disrupt, damage,
        overburden, impair or limit the functioning of any software, hardware, network, server or communications systems
        or equipment; • disrupt, interfere or inhibit any other user from enjoying the Website and Services or other
        affiliated or linked websites, material, contents, products and/or services; • use any robot, spider, or other
        such programmatic or automatic device, inducing but not limited to automated dial-in or inquiry devices, to
        obtain information from the Website or otherwise monitor or copy any portion of the Website and Services; •
        create a false identity for the purpose of misleading others; • prepare, compile, use, download or otherwise
        copy any user information and/or usage information for any portion thereof, or transmit, provide or otherwise
        distribute (whether or not for a fee) such information to any third party; • attempt to disable, bypass, modify,
        defeat or otherwise circumvent any security related tools incorporated into the Website; • reproduce, duplicate,
        copy, sell, or exploit for any commercial purposes, any portion of the Website and Services or access to the
        Website and Services; • systematically collect or use any content from the Website and Services, including
        through the use of any data mining, or similar data gathering and extraction methods. Privacy The security of
        your personally identifying information is important to us. While there is no such thing as "perfect security"
        on the Internet, we will take reasonable steps to help ensure the safety of your personally identifying
        information. However, you understand and agree that such steps do not guarantee that use of the Website is
        invulnerable to all security breaches, and that Easylabs makes no warranty, guarantee, or representation that
        use of any of our Website is protected from viruses, security threats or other vulnerabilities. Communications
        You are communicating with us electronically when you use any Service or send us emails and other communications
        from your desktop or mobile device. You agree to receive electronically all communications from us in connection
        with your use of our Services, which may include emails, texts, mobile push notices, or messages on the Website
        or through other Services. Accuracy of Information Easylabs does not warrant that any information, pictures or
        graphic depictions, descriptions or other content of the Website or Services are accurate, complete, reliable,
        updated, current, or error-free. You agree to notify Easylabs immediately if you become aware of any errors or
        inconsistencies in the information or content provided through the Website or Services and comply with any
        corrective action taken by Easylabs. Third Party Content and Monitoring Parties other than Easylabs may offer
        and provide products and services on or through the Website or Services. Easylabs does not operate, control, or
        endorse any information, products, or services on the Website or Services or accessible through the Website or
        Services in any way. Easylabs is not responsible for examining or evaluating, and Easylabs does not warrant the
        offerings of, any of these businesses or individuals or the content of their websites. Easylabs does not assume
        any responsibility or liability for the actions, product, and content of all these and any other third parties.
        You should carefully review their privacy statements and other conditions of use. Our provision of a link to any
        other website or location is for your convenience and does not signify our endorsement of such other site or
        location or its contents. We have no control over, do not review, and cannot be responsible for, these outside
        websites or their content. Access to any other websites linked to the Website and Services is at your own risk.
        When leaving the Website or Services, you should carefully review the applicable terms and policies, including
        privacy and data gathering practices, of that third-party website. WE WILL NOT BE LIABLE FOR ANY INFORMATION,
        SOFTWARE, OR LINKS FOUND AT ANY OTHER WEBSITE, INTERNET LOCATION, OR SOURCE OF INFORMATION, NOR FOR YOUR USE OF
        SUCH INFORMATION, SOFTWARE OR LINKS, NOR FOR THE ACTS OR OMISSIONS OF ANY SUCH WEBSITES OR THEIR RESPECTIVE
        OPERATORS. Ownership and Intellectual Property Rights The Website and Services, and its entire contents,
        features, and functionality (including but not limited to all information, software, code, algorithms, database,
        text, displays, images, video and audio, and the design, selection and arrangement thereof) ("Our Content" and
        "Our Technology") are owned by Easylabs. Neither Our Content nor Our Technology may be copied, modified,
        reproduced, republished, posted, transmitted, sold, offered for sale, or redistributed in any way without our
        prior written permission and the prior written permission of our applicable licensors. You must abide by all
        copyright notices, information, or restrictions contained in or attached to any of Our Content or Our Technology
        and you may not remove or alter any such notice, information or restriction. Your use of Our Content and
        Technology must at all times comply with these Terms of Service. Nothing in these Terms of Service grants you
        any right to receive delivery of a copy of Our Technology or to obtain access to Our Technology except as
        generally and ordinarily permitted through the Website according to these Terms of Service. Account
        Closure/Termination If you violate these Terms of Service, Easylabs has the right to terminate your access to
        all or part of the Website and Services. You understand that termination of your access to Easylabs pursuant to
        these Terms of Service will not entitle you to any refund and may involve deletion of your information from our
        live databases as well as any content that you uploaded to the Website and/or Services. DISCLAIMER OF WARRANTIES
        YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE AND SERVICES IS AT YOUR SOLE RISK. THE WEBSITE AND SERVICES ARE
        PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. EASYLABS EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND,
        WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR USE OR PURPOSE, NON-INFRINGEMENT, TITLE, OPERABILITY, CONDITION, QUIET ENJOYMENT, VALUE, ACCURACY OF
        DATA AND SYSTEM INTEGRATION. EASYLABS MAKES NO WARRANTY THAT THE WEBSITE OR SERVICES WILL MEET YOUR
        REQUIREMENTS, OR THAT THE WEBSITE OR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR FREE; NOR DOES
        EASYLABS MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE WEBSITE OR SERVICES, OR
        THAT DEFECTS IN THE WEBSITE OR SERVICES WILL BE CORRECTED. You understand that we cannot and do not guarantee or
        warrant that content available for downloading from the Website or any links provided on the Website will be
        free of viruses or other destructive code. You are responsible for implementing sufficient anti-virus
        protections to meet your needs. You are also responsible for maintaining a means external to our Website for any
        reconstruction of any lost data. YOU UNDERSTAND AND AGREE THAT ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED
        THROUGH THE USE OF THE WEBSITE IS DONE AT YOUR OWN DISCRETION AND RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE
        FOR ANY DAMAGE OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH MATERIAL AND/OR INFORMATION. NO ADVICE OR
        INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM LAB EASYLABS OR THROUGH THE WEBSITE OR SERVICES WILL
        CREATE ANY WARRANTY NOT EXPRESSLY MADE HEREIN. LIMITATION OF LIABILITY YOU UNDERSTAND THAT TO THE EXTENT
        PERMITTED UNDER APPLICABLE LAW, IN NO EVENT WILL EASYLABS OR ITS OFFICERS, EMPLOYEES, DIRECTORS, PARENTS,
        SUBSIDIARIES, AFFILIATES, AGENTS OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR
        EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF REVENUES, PROFITS, GOODWILL, USE, DATA OR
        OTHER INTANGIBLE LOSSES (EVEN IF SUCH PARTIES WERE ADVISED OF, KNEW OF OR SHOULD HAVE KNOWN OF THE POSSIBILITY
        OF SUCH DAMAGES, AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY), ARISING OUT OF OR
        RELATED TO YOUR USE OF THE WEBSITE AND SERVICES, REGARDLESS OF WHETHER SUCH DAMAGES ARE BASED ON CONTRACT, TORT
        (INCLUDING NEGLIGENCE AND STRICT LIABILITY), WARRANTY, STATUTE OR OTHERWISE. IF YOU ARE DISSATISFIED WITH ANY
        PORTION OF THIS WEBSITE OR SERVICES, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USE OF THE WEBSITE AND
        SERVICES. THE AGGREGATE LIABILITY OF EASYLABS TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO WEBSITE AND
        SERVICES IS LIMITED TO THE LESSER OF (I) THE AMOUNT OF FEES ACTUALLY PAID BY YOU FOR USE OF THE SERVICES OR (II)
        ONE HUNDRED DOLLARS (U.S. $100.00). Some jurisdictions do not allow the exclusion of certain warranties or the
        limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the above
        limitations and disclaimers may not apply to you. To the extent that we may not, as a matter of applicable law,
        disclaim any implied warranty or limit its liabilities, the scope and duration of such warranty and the extent
        of our liability will be the minimum permitted under such applicable law. Indemnification You agree to
        indemnify, defend and hold harmless Easylabs and its affiliates, licensors, co-branders, suppliers and other
        contract relationship, and the officers, directors, employees, consultants, and agents of each, and other
        Registered Users and Visitors, from and against any and all third-party claims, liabilities, damages, losses,
        costs, expenses, fees (including reasonable attorneys' fees and court costs) that such parties may incur as a
        result of or arising from (1) User Content and any information you submit, post or transmit through the Website,
        (2) your use of the Website and Services, (3) your violation of these Terms of Service, (4) your violation of
        any rights of any other person or entity or (5) any viruses, trojan horses, worms, time bombs, cancelbots or
        other similar harmful or deleterious programming routines input by you into the Website and Services. Disputes
        If a dispute arises between you and Easylabs, you agree to first contact Easylabs (info@easylabs.org) to seek a
        resolution. Waiver and Severability No waiver of these Terms of Service by Easylabs shall be deemed a further or
        continuing waiver of such term or condition or any other term or condition. Any failure of Easylabs to assert a
        right or provision under these Terms of Service shall not constitute a waiver of such right or provision. If any
        provision of these Terms of Service is held by a court of competent jurisdiction to be invalid, illegal or
        unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the
        remaining provisions of these Terms of Service will continue in full force and effect. Entire Agreement These
        Terms of Service constitute the sole and entire agreement between you and Easylabs with respect to the Website
        and Services and supersede all prior and contemporaneous understandings, agreements, representations and
        warranties, both written and oral, with respect to the Website and Services.
      </Box>
      {/* <Box mb={1} width="100%"> */}
      {/*  <FormControlLabel */}
      {/*    control={ */}
      {/*      <Switch */}
      {/*        color="primary" */}
      {/*        checked={smoke} */}
      {/*        onChange={(event) => onChangeInput(event, InputsTypes.SWITCH, 'smoke')} */}
      {/*      /> */}
      {/*    } */}
      {/*    label="Smoking?" */}
      {/*    labelPlacement="top" */}
      {/*  /> */}
      {/* </Box> */}
      {/* {sex === EasyLabsSex.FEMALE && ( */}
      {/*  <Box mb={1} width="100%"> */}
      {/*    <FormControlLabel */}
      {/*      control={ */}
      {/*        <Switch */}
      {/*          color="primary" */}
      {/*          checked={pregnant} */}
      {/*          onChange={(event) => onChangeInput(event, InputsTypes.SWITCH, 'pregnant')} */}
      {/*        /> */}
      {/*      } */}
      {/*      label="pregnant?" */}
      {/*      labelPlacement="top" */}
      {/*    /> */}
      {/*  </Box> */}
      {/* )} */}
      {/* <Box mb={1} width="100%"> */}
      {/*  <TextField */}
      {/*    fullWidth */}
      {/*    value={height} */}
      {/*    onChange={(event) => onChangeInput(event, InputsTypes.DEFAULT, 'height')} */}
      {/*    name="Height" */}
      {/*    label="Height" */}
      {/*    id="formatted-text-mask-input" */}
      {/*    InputProps={{ */}
      {/*      inputComponent: TextMaskCustom as any, */}
      {/*      inputProps: { */}
      {/*        mask: [/\d/, "'", ' ', /\d/, /\d/, "''"], */}
      {/*      }, */}
      {/*    }} */}
      {/*  /> */}
      {/* </Box> */}
      {/* <Box mb={1} width="100%"> */}
      {/*  <FormControl fullWidth> */}
      {/*    <InputLabel htmlFor="standard-adornment-password">weight</InputLabel> */}
      {/*    <Input */}
      {/*      id="standard-adornment-weight" */}
      {/*      value={weight} */}
      {/*      type="number" */}
      {/*      onChange={(event) => onChangeInput(event, InputsTypes.NUMBER, 'weight')} */}
      {/*      endAdornment={<InputAdornment position="end">lbs.</InputAdornment>} */}
      {/*      aria-describedby="standard-weight-helper-text" */}
      {/*      inputProps={{ */}
      {/*        'aria-label': 'weight', */}
      {/*        min: 0, */}
      {/*      }} */}
      {/*    /> */}
      {/*  </FormControl> */}
      {/* </Box> */}
      {/* <Box mb={1} width="100%"> */}
      {/*  <TextField */}
      {/*    fullWidth */}
      {/*    value={bloodPressure} */}
      {/*    onChange={(event) => onChangeInput(event, InputsTypes.DEFAULT, 'bloodPressure')} */}
      {/*    name="bloodPressure" */}
      {/*    label="Blood Pressure" */}
      {/*    id="formatted-text-mask-bloodPressure" */}
      {/*    InputProps={{ */}
      {/*      inputComponent: TextMaskCustom as any, */}
      {/*      inputProps: { */}
      {/*        mask: [/\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/], */}
      {/*      }, */}
      {/*    }} */}
      {/*  /> */}
      {/* </Box> */}
      {/* <Box mb={1} width="100%"> */}
      {/*  <FormControl fullWidth> */}
      {/*    <TextField */}
      {/*      id="testDate" */}
      {/*      label="Test date" */}
      {/*      type="date" */}
      {/*      onChange={(event) => onChangeInput(event, InputsTypes.DEFAULT, 'testDate')} */}
      {/*      value={testDate} */}
      {/*      InputLabelProps={{ */}
      {/*        shrink: true, */}
      {/*      }} */}
      {/*    /> */}
      {/*  </FormControl> */}
      {/* </Box> */}
      <Box>
        <Button color="primary" variant="contained" onClick={onSaveProfile}>
          I Agree
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
