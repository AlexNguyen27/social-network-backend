import joi from 'joi';
import PostService from '../services/post.service';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE, POST_STATUS, REPORT_STATUS } from '../components/constants';
import ReportService from '../services/report.service';

const resolver = {
  Query: {
    getReports: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: any) => ReportService.getReports(),
    ),
  },
  Mutation: {
    createReport: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        reason: joi.string(),
        description: joi.string(),
        imageUrl: joi.string(),
        reportedBy: joi.string().uuid(),
        postId: joi.string().uuid(),
        status: joi.string().valid(Object.values(REPORT_STATUS))
      }),
      (_: any, args: any ) => ReportService.createReport(args),
    ),

    updateRerport: middleware(
      tokenValidation(ROLE.admin),
      schemaValidation({
        description: joi.string(),
        reportedBy: joi.string().uuid(),
        postId: joi.string().uuid(),
        status: joi.string().valid(Object.values(REPORT_STATUS))
      }),
      (_: any, args: any, { user }: any ) => ReportService.updateRerport(args),
    ),

    deleteReport: middleware(
      tokenValidation(ROLE.admin),
      schemaValidation({
        reportedBy: joi.string().uuid(),
        postId: joi.string().uuid(),
      }),
      (_: any, args: { id: string }) => ReportService.deleteReport(args),
    )
  },
};

export default resolver;
