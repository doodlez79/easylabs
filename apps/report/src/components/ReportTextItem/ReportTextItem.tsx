import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

import { ColorByTypeResult, EasyLabsRangeSetType } from '@easy-labs-int/shared';
import { getColorByResult, ResultTypesAnother } from '@easy-labs-int/shared/dist/helpers';

import { Gauge } from 'components/Gauge';
import { ReportTextItemProps } from './ReportTextItem.types';
import { useStyles } from './styles';

const ReportTextItem: FC<ReportTextItemProps> = ({ title, value, descr, type, range, field }) => {
  const classes = useStyles();
  let significance = '';
  let treatment = '';

  if (range) {
    if (range.optimal) {
      significance = range?.optimal.significance;
      treatment = range?.optimal.treatment;
    }
    if (field) {
      if ('significance' in field) {
        significance = field.significance;
      }
      if ('treatment' in field) {
        treatment = field.treatment;
      }
    }
  }

  return (
    <Box p={2} border={2} mb={1} borderRadius={5}>
      <Box p={1} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" mb={1} className={classes.mobileVersion}>
          <Box display="flex" flexDirection="column">
            <Typography
              style={{
                color: getColorByResult(type),
                marginBottom: '15px',
              }}
              variant="h4"
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              style={{
                color: getColorByResult(type),
                textDecoration: 'underline',
              }}
            >
              {`Your result is ${ResultTypesAnother[type]}`}
            </Typography>
            <Box>
              <div
                style={{
                  marginBottom: '10px',
                  overflow: 'auto',
                }}
                dangerouslySetInnerHTML={{
                  __html: descr,
                }}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {value && <Gauge value={value} sets={range && range.sets ? range.sets : []} />}

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border={4}
              borderRadius={16}
              borderColor={getColorByResult(type)}
              minWidth="150px"
              minHeight="50px"
              width="100%"
            >
              <Typography>{value}</Typography>
            </Box>
            {/* <Typography color="secondary">Optimal: 114-141</Typography> */}
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          {type === EasyLabsRangeSetType.CRITICAL ? (
            <Box
              display="flex"
              flexDirection="column"
              border={6}
              borderColor={ColorByTypeResult.CRITICAL}
              borderRadius={5}
              p={1}
            >
              <Typography gutterBottom variant="h6">
                {field && 'type' in field ? `Critical ${field.type}` : ''}
              </Typography>
              <Typography>{field && 'title' in field ? field.title : ''}</Typography>
            </Box>
          ) : (
            <>
              <Box display="flex" flexDirection="column" mb={1} border={4} borderRadius={5} p={1}>
                <Typography
                  style={{
                    marginBottom: '10px',
                  }}
                  variant="h6"
                >
                  Significance
                </Typography>
                <div
                  style={{
                    marginBottom: '10px',
                    fontSize: 14,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: significance,
                  }}
                />
              </Box>
              <Box display="flex" flexDirection="column" border={4} borderRadius={5} p={1}>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '10px',
                  }}
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's Next
                </Typography>
                <div
                  style={{
                    marginBottom: '10px',
                    fontSize: 14,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: treatment,
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReportTextItem;
