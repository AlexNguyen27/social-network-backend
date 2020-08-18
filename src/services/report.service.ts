import { Op } from 'sequelize';
import { ExistsError } from '../components/errors';
import Report from '../models/report.model';
import Post from '../models/post.model';
import User from '../models/user.model';
import UserService from './user.service';
import PostService from './post.service';

class ReportService {
  static getReports() {
    return Report.findAll({
      include: [
        {
          model: Post,
          as: 'post',
        },
        {
          model: User,
          as: 'user',
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  // TODO: role user can report
  static async createReport(data: any) {
    const { reportedBy, postId } = data;

    // CHECK IF POSTID AND REPORT ID EXITS
    await UserService.findUserById(reportedBy);
    await PostService.findPostById({ id: postId });

    return Report.create({
      ...data,
    });
  }

  static async findReportById(reportedBy: string, postId: string) {
    return Report.findOne({
      where:
      {
        [Op.and]: [
          { reportedBy },
          { postId },
        ],
      },
    }).then((report) => {
      if (!report) throw new ExistsError('Report not found');
      return report;
    });
  }

  // TODO : ONLY ADMIN CAN UPDATE REPORT => GET ROLE AT TOKEN
  static async updateRerport(data: any) {
    console.log('data------------------', data);
    const { reportedBy, postId } = data;
    await this.findReportById(reportedBy, postId);
    await Report.update({ description: data.description, status: data.status }, {
      where:
      {
        [Op.and]: [
          { reportedBy },
          { postId },
        ],
      },
    });

    const currentReport = await this.findReportById(reportedBy, postId);
    return currentReport;
  }

  static async deleteReport(data: any) {
    const { reportedBy, postId } = data;
    await this.findReportById(reportedBy, postId);
    try {
      await Report.destroy({
        where:
        {
          [Op.and]: [
            { reportedBy },
            { postId },
          ],
        },
      });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default ReportService;
