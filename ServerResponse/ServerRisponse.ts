import { Response } from 'express';

class ServerResponseHandler {
    // success
    handleSuccess(res: Response,  data: any,message?: string | undefined) {
        return res?.status(200).json({
            code: 'SUCCESS_200',
            success: true,
            data: data,
            message: message ? message : 'Request Successful'
        });
    }

    // not found
    handleNotFound(res: Response, message?: string | undefined) {
        return res?.status(404).json({
            code: 'ERROR_404',
            success: false,
            message: message ? message : 'Resource not found.',
        });
    }

    // something went wrong
    somethingWentWrong(res: Response, message?: string | undefined) {
        return res?.status(500).json({
            code: 'ERROR_500',
            success: false,
            message: message ? message : 'Internal Server Error.',
        });
    }

    // bad request
    badRequest(res: Response, message?: string | undefined) {
        return res?.status(400).json({
            code: 'ERROR_400',
            success: false,
            message: message ? message : 'Bad Request',
        });
    }

    // unAuthorized
    unAuthorized(res: Response, message?: string | undefined) {
        return res?.status(401).json({
            code: 'ERROR_401',
            success: false,
            message: message ? message : 'Unauthorized',
        });
    }
}

export default ServerResponseHandler;
